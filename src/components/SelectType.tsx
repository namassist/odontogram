import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { useTooth } from "@/context/tooth-context";

export function SelectType() {
  const { selectedOption, setSelectedOption } = useTooth();

  return (
    <div className="select-type space-y-2">
      <Label>Pilih Tipe Gigi</Label>
      <Select
        value={selectedOption}
        onValueChange={(value) => {
          setSelectedOption(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tipe Gigi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipe Gigi</SelectLabel>
            <SelectItem value="anak">Anak</SelectItem>
            <SelectItem value="dewasa">Dewasa</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
