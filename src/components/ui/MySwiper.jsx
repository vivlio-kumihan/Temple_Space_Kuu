// @/app/components/ui/Swiper.jsx

// styled-componentsでスタイル定義する
import styled from "styled-components";
// React用Swiperオブジェクトを読み込む
import { Swiper, SwiperSlide } from "swiper/react";
// 各種エフェクトを読み込む
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"; // EffectFade追加
// Swiper用各種CSSを読み込む
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// UIで使用するメディアクエリのモジュールを読み込む
import { mq } from "./MixIn";

// 共通のStyledSwiper
const StyledSwiper = styled(Swiper)`
  width: ${({ $width }) => $width || "100vw"};
  height: ${({ $height }) => $height || "80vh"};
  ${mq.lg} {
    width: ${({ $widthMqLg }) => $widthMqLg || "100vw"};
    height: ${({ $heightMqLg }) => $heightMqLg || "600px"};
  }
`;

// GraphicSwiper用のスタイル
const StyledSlideContent = styled.div`
  background: ${({ $bgColor }) => $bgColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SlideTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  ${mq.lg} {
    font-size: 32px;
  }
`;

const SlideText = styled.p`
  font-size: 16px;
  ${mq.lg} {
    font-size: 18px;
  }
`;

// ImageSwiper用のスタイル
const ImageSlideContent = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 20px;
  font-size: 14px;
  ${mq.lg} {
    font-size: 16px;
    padding: 30px;
  }
`;

// GraphicSwiper コンポーネント
export const GraphicSwiper = ({
  slides,
  width,
  height,
  widthMqLg,
  heightMqLg,
  ...props
}) => {
  const defaultSlides = [
    {
      id: 1,
      title: "SwiperSlide #1",
      text: "It's first slide.",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "SwiperSlide #2",
      text: "It's second slide.",
      color: "#10b981",
    },
    {
      id: 3,
      title: "SwiperSlide #3",
      text: "It's third slide.",
      color: "#8b5cf6",
    },
    {
      id: 4,
      title: "SwiperSlide #4",
      text: "It's fourth slide.",
      color: "#f59e0b",
    },
    {
      id: 5,
      title: "SwiperSlide #5",
      text: "It's last slide.",
      color: "#ec4899",
    },
  ];

  const slideData = slides || defaultSlides;

  return (
    <StyledSwiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      speed={2000}
      loop={true}
      $width={width}
      $height={height}
      $widthMqLg={widthMqLg}
      $heightMqLg={heightMqLg}
      {...props}
    >
      {slideData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <StyledSlideContent $bgColor={slide.color}>
            <SlideTitle>{slide.title}</SlideTitle>
            <SlideText>{slide.text}</SlideText>
          </StyledSlideContent>
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

// ImageSwiper コンポーネント（統合版）
export const ImageSwiper = ({
  images,
  width,
  height,
  widthMqLg,
  heightMqLg,
  useFade = false, // フェイド切り替え用props
  ...props
}) => {
  const defaultImages = [
    {
      id: 1,
      src: "https://picsum.photos/800/400?random=1",
      caption: "Beautiful Landscape 1",
    },
    {
      id: 2,
      src: "https://picsum.photos/800/400?random=2",
      caption: "Beautiful Landscape 2",
    },
    {
      id: 3,
      src: "https://picsum.photos/800/400?random=3",
      caption: "Beautiful Landscape 3",
    },
    {
      id: 4,
      src: "https://picsum.photos/800/400?random=4",
      caption: "Beautiful Landscape 4",
    },
    {
      id: 5,
      src: "https://picsum.photos/800/400?random=5",
      caption: "Beautiful Landscape 5",
    },
  ];

  const imageData = images || defaultImages;

  return (
    <StyledSwiper
      modules={
        useFade
          ? [Navigation, Pagination, Autoplay, EffectFade]
          : [Navigation, Pagination, Autoplay]
      }
      effect={useFade ? "fade" : "slide"}
      fadeEffect={useFade ? { crossFade: true } : undefined}
      // spaceBetween={useFade ? 0 : 30} // スライドの間隔はゼロでいいよ。
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      speed={2000}
      loop={true}
      $width={width}
      $height={height}
      $widthMqLg={widthMqLg}
      $heightMqLg={heightMqLg}
      {...props}
    >
      {imageData.map((image) => (
        <SwiperSlide key={image.id}>
          <ImageSlideContent>
            <SlideImage
              src={image.src}
              alt={image.caption || `Slide ${image.id}`}
            />
            {image.caption && <ImageCaption>{image.caption}</ImageCaption>}
          </ImageSlideContent>
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

// @/app/page.jsxにあったスタイル　削除した。
// .hero {
//   padding: 6rem 2rem;
//   text-align: center;
//   color: white;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   // &__title {
//   //   margin-bottom: 1rem;
//   //   font-size: 3rem;
//   //   font-weight: 700;
//   //   @include mq(md) {
//   //     font-size: 2rem;
//   //   }
//   // }
//   &__subTitle {
//     font-size: 1.5rem;
//     margin-bottom: 2rem;
//     opacity: 0.9;
//     @include mq(md) {
//       font-size: 1.2rem;
//     }
//   }
//   &__text {
//     opacity: .85;
//   }
// }