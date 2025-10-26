// @/lib/readPhotographedWorksMetaData.jsx

import Papa from "papaparse";

export async function readPhotographedWorksMetaData() {
  const res = await fetch("/images/photographedWorks/meta-data.csv");
  if (!res.ok) throw new Error("Failed to load meta-data.csv");

  const text = await res.text();
  // Papa.parseの戻り値は { data, errors, meta } という構造になっている。
  // 分割代入で値を入れるので、キーを変えることはできない。JSの基本。
  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });
  return data;
}
