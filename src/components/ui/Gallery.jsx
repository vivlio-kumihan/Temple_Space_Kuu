// @/components/ui/Gallery.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import { readPhotographedWorksMetaData } from "@/lib/readPhotographedWorksMetaData";
import styled from "styled-components";
import { mq, fontFamily } from "./MixIn";

// ========================================
// Styled Components
// ========================================
const GallerySection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const SectionSubtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  ${mq.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  ${mq.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PhotoCard = styled.article`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const PhotoInfo = styled.div`
  padding: 1rem;
`;

const PhotoLocation = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: #999;
`;

const PhotoCaption = styled.p`
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PhotoDate = styled.time`
  font-family: ${fontFamily.gothic};
  font-size: 0.75rem;
  color: #999;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3182ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: #666;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 1rem 3rem;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background-color: #3182ce;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c5282;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const EndMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.875rem;
  padding: 2rem;
`;

const ResetButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.75rem 2.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #3182ce;
  background-color: white;
  border: 2px solid #3182ce;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3182ce;
    color: white;
  }
`;

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  transition: all 0.3s;
  z-index: 1000;
  cursor: pointer;
  animation: appear 0.5s;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Gallery = () => {
  const [allMetaData, setAllMetaData] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const gallerySectionRef = useRef(null);

  const itemsPerPage = 6;

  // ⚫︎非同期処理をしているのは、ネットワーク通信でCSVを取得しているから。
  // ⚫︎3つの更新用関数の意味
  //    1. ディレクトリにあるアイテム・データ（写真データ）の初期化。
  //    2. 表示しているアイテムの状態を更新用関数で更新する。
  //       最初から6つのアイテムのセットが『予約』される。
  //    3. この行がないと、dataがitemsPerPageの数より少ない場合に、
  //      『もっと見る』ボタンが表示されてしまうから。
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readPhotographedWorksMetaData();
        setAllMetaData(data);
        setDisplayedPhotos(data.slice(0, itemsPerPage));
        setHasMore(data.length > itemsPerPage);
      } catch (error) {
        console.error("写真のデータ取得に失敗しました。", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // page, allMetaDataのstateが更新する度に発火する。
  useEffect(() => {
    if (page === 1) return;

    const loadMorePhotos = async () => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newPhotos = allMetaData.slice(startIndex, endIndex);

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedPhotos((prev) => [...prev, ...newPhotos]);
        endIndex >= allMetaData.length && setHasMore(false);
      }
      setLoading(false);
    };

    loadMorePhotos();
  }, [page, allMetaData]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleReset = () => {
    setPage(1);
    setDisplayedPhotos(allMetaData.slice(0, itemsPerPage));
    setHasMore(allMetaData.length > itemsPerPage);
    gallerySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePhotoCardClick = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <GallerySection ref={gallerySectionRef}>
        <SectionTitle>📷 Photo Gallery</SectionTitle>
        <SectionSubtitle>最新の撮影作品をチェック</SectionSubtitle>
        <PhotoGrid>
          {displayedPhotos.map((item) => (
            <PhotoCard
              key={item.fileName}
              onClick={() =>
                handlePhotoCardClick(
                  `/images/photographedWorks/${item.fileName}`
                )
              }
            >
              <PhotoImage
                src={`/images/photographedWorks/${item.fileName}`}
                alt={item.fileName}
                width={400}
                height={300}
              />
              <PhotoInfo>
                <PhotoCaption>{item.caption}</PhotoCaption>
                <PhotoDate>
                  {item.fileName
                    .split("_")[0]
                    .replace(/(\d{2})(\d{2})(\d{2})/, "$1/$2/$3")}
                </PhotoDate>
                <PhotoLocation>📍 {item.location}</PhotoLocation>
              </PhotoInfo>
            </PhotoCard>
          ))}
        </PhotoGrid>

        {loading && (
          <LoadingContainer>
            <Spinner />
            <LoadingText>読み込み中...</LoadingText>
          </LoadingContainer>
        )}

        {!loading && hasMore && (
          <LoadMoreButton onClick={handleLoadMore}>もっと見る ▼</LoadMoreButton>
        )}

        {!loading && !hasMore && displayedPhotos.length > 0 && (
          <>
            <EndMessage>すべての作品を表示しました</EndMessage>
            <ResetButton onClick={handleReset}>最初に戻る ↑</ResetButton>
          </>
        )}
      </GallerySection>

      {modalImage && (
        <Modal onClick={closeModal}>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <ModalImage src={modalImage} alt="拡大表示" />
        </Modal>
      )}
    </>
  );
};

export default Gallery;
