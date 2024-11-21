import * as React from "react";
import { driver } from "driver.js";
import { useSearchParams } from "react-router-dom";
import "driver.js/dist/driver.css";

import { steps } from "@/constants/steps";
import { useToast } from "@/hooks/use-toast";
import { useTooth } from "@/context/tooth-context";

import { Button } from "@/components/ui/button";
import { SelectType, ContextMenu, ToothTable, Teeth } from "@/components";
import { useOdontogramMutation } from "./hooks/mutation/use-odontogram-mutation";
import { Loader2 } from "lucide-react";

export default function App() {
  const { toast } = useToast();

  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");
  const rawKey = key?.replace(/ /g, "+") as string;
  const medicalRecord = searchParams.get("medical_record");

  const { state, selectedOption } = useTooth();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: steps,
    });

    driverObj.drive();
  }, []);

  const mutation = useOdontogramMutation({
    onSuccess: () => {
      toast({
        title: "Sukses",
        description: "Data Odontogram Berhasil Terkirim!",
      });
    },
    onError: (error: unknown) => {
      toast({
        title: "Error",
        description: (error as Error).message || "Gagal mengupload odontogram!",
      });
    },
  });

  const handleSaveOdontogram = () => {
    if (!medicalRecord || !key) {
      toast({
        title: "Error",
        description: "Medical record tidak valid!",
      });
      return;
    }

    mutation.mutate({
      ref,
      state,
      rawKey,
      medicalRecord,
    });
  };

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
          <Button
            size="lg"
            onClick={handleSaveOdontogram}
            disabled={selectedOption === "" ? true : false}
          >
            {mutation.status === "pending" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save Odontogram"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
