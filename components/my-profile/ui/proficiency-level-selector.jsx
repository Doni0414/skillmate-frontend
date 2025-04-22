import { Select } from "../../common/select";

export function ProficiencyLevelSelect({ value, values, labels, onSelect }) {
  return (
    <Select
      value={value}
      values={values}
      labels={labels}
      className="mb-[77px] w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none"
      onSelect={onSelect}
    />
  );
}
