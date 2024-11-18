import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTooth } from "./context/tooth-context";
import ContextMenu from "./components/ContextMenu";
import { SelectType } from "./components/SelectType";
import Teeth from "./components/Teeth";
import ToothTable from "./components/ToothTable";
import React from "react";
import { toPng } from "html-to-image";
import { dataURLtoBlob } from "./lib/utils";

export default function App() {
  const { state, selectedOption } = useTooth();
  const ref = React.useRef<HTMLDivElement>(null);

  const onButtonClick = React.useCallback(() => {
    console.log(state);
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        //download image
        // const link = document.createElement("a");
        // link.download = "my-image-name.png";
        // link.href = dataUrl;
        // link.click();

        // convert to blob
        const blob = dataURLtoBlob(dataUrl);

        const formData = new FormData();
        formData.append("metadata", JSON.stringify(state));
        formData.append("image", blob, "image.png");

        // fetch(
        //   "https://67370a2baafa2ef2223264cf.mockapi.io/api/upload/medicalrecord",
        //   {
        //     method: "POST",
        //     body: formData,
        //   }
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Upload successful:", data);
        //   })
        //   .catch((error) => {
        //     console.error("Upload failed:", error);
        //   });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  React.useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".select-type",
          popover: {
            title: "Pemilihan Kategori Pasien",
            description:
              "Pilih kategori pasien (dewasa/anak) untuk menentukan jenis pemeriksaan gigi yang sesuai. Hal ini akan mempengaruhi tampilan dan opsi odontogram.",
          },
        },
        {
          element: ".odontogram",
          popover: {
            title: "Diagram Odontogram",
            description:
              "Visualisasi lengkap struktur gigi pasien dalam format standar FDI (Federation Dentaire Internationale). Diagram ini menampilkan 32 gigi permanen dan 20 gigi sulung.",
          },
        },
        {
          element: ".tooth-11",
          popover: {
            title: "Interaksi Pemeriksaan Gigi",
            description:
              "Gunakan klik kanan atau double klik pada gigi untuk mencatat kondisi, perawatan, atau restorasi. Setiap pilihan akan mempengaruhi notasi dan tampilan odontogram secara real-time.",
          },
        },
        {
          element: ".top-table",
          popover: {
            title: "Rekam Status Gigi Rahang Atas",
            description:
              "Tabel ini menampilkan notasi lengkap kondisi gigi rahang atas (gigi 11-18 dan 21-28), termasuk kode perawatan dan restorasi yang telah dilakukan.",
          },
        },
        {
          element: ".bottom-table",
          popover: {
            title: "Rekam Status Gigi Rahang Bawah",
            description:
              "Tabel ini menampilkan notasi lengkap kondisi gigi rahang bawah (gigi 31-38 dan 41-48), termasuk kode perawatan dan restorasi yang telah dilakukan.",
          },
        },
        {
          element: ".save-button",
          popover: {
            title: "Penyimpanan Rekam Medis",
            description:
              "Simpan seluruh data pemeriksaan odontogram ke dalam sistem rekam medis. Pastikan semua informasi telah diisi dengan lengkap sebelum menyimpan.",
          },
        },
      ],
    });

    driverObj.drive();
  }, []);

  return (
    <div className="w-full py-5 pb-20 min-h-screen">
      <div className="container mx-auto flex flex-col space-y-8 bg-white">
        <ContextMenu />
        <SelectType />

        <div ref={ref} className="space-y-4 bg-white pb-10">
          <ToothTable
            position="top"
            state={state}
            selectedOption={selectedOption}
          />

          <svg className="odontogram w-full h-[370px]">
            <Teeth
              labelPlacement="top"
              toothType="back"
              start={18}
              end={14}
              x={150}
              y={30}
            />
            <Teeth
              labelPlacement="top"
              toothType="front"
              start={13}
              end={11}
              x={250}
              y={30}
            />
            <Teeth
              labelPlacement="top"
              toothType="front"
              start={21}
              end={23}
              x={320}
              y={30}
            />
            <Teeth
              labelPlacement="top"
              toothType="back"
              start={24}
              end={28}
              x={380}
              y={30}
            />

            <Teeth
              labelPlacement="top"
              toothType="back"
              start={55}
              end={54}
              x={210}
              y={95}
            />
            <Teeth
              labelPlacement="top"
              toothType="front"
              start={53}
              end={51}
              x={250}
              y={95}
            />
            <Teeth
              labelPlacement="top"
              toothType="front"
              start={61}
              end={63}
              x={320}
              y={95}
            />
            <Teeth
              labelPlacement="top"
              toothType="back"
              start={64}
              end={65}
              x={380}
              y={95}
            />

            <Teeth
              labelPlacement="bottom"
              toothType="back"
              start={85}
              end={84}
              x={210}
              y={140}
            />
            <Teeth
              labelPlacement="bottom"
              toothType="front"
              start={83}
              end={81}
              x={250}
              y={140}
            />
            <Teeth
              labelPlacement="bottom"
              toothType="front"
              start={71}
              end={73}
              x={320}
              y={140}
            />
            <Teeth
              labelPlacement="bottom"
              toothType="back"
              start={74}
              end={75}
              x={380}
              y={140}
            />

            <Teeth
              labelPlacement="bottom"
              toothType="back"
              start={48}
              end={44}
              x={150}
              y={205}
            />
            <Teeth
              labelPlacement="bottom"
              toothType="front"
              start={43}
              end={41}
              x={250}
              y={205}
            />
            <Teeth
              labelPlacement="bottom"
              toothType="front"
              start={31}
              end={33}
              x={320}
              y={205}
            />
            <Teeth
              labelPlacement="bottom"
              toothType="back"
              start={34}
              end={38}
              x={380}
              y={205}
            />
          </svg>

          <ToothTable
            position="bottom"
            state={state}
            selectedOption={selectedOption}
          />
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="container mx-auto flex justify-end">
          <button className="save-button" onClick={onButtonClick}>
            Save Odontogram
          </button>
        </div>
      </div>
    </div>
  );
}
