import { ProtonDBTierColor } from "@/@types";
import { useProtonDb } from "@/hooks";

import protonDBBadge from "@/assets/protondb.png";

interface Props {
  appId: string;
}

const ProtonDbBadge = ({ appId }: Props) => {
  const { data, error, isPending } = useProtonDb(appId);

  if (isPending || error) return null;
  if (!data) return null;

  const { tier } = data;

  if (tier === "pending" || !tier) return null;

  const color = ProtonDBTierColor[tier as keyof typeof ProtonDBTierColor];

  return (
    <div
      className="flex items-center gap-1 h-8 overflow-hidden px-3 py-1"
      style={{ backgroundColor: color }}
    >
      <img src={protonDBBadge} className=" size-full object-contain" />
      {/* <span className="text-lg uppercase text-black font-bold">{tier}</span> */}
    </div>
  );
};

export default ProtonDbBadge;
