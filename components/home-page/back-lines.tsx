import { cn } from "@/lib/utils";

export default function BackLinesSvg({ color, className }: { color: string; className: string }) {
  return (
    <svg
      className={cn(className)}
      width="4471"
      height="2225"
      viewBox="0 0 4471 2225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1286 1800.37L1788.74 1157.29L812.097 1135.76L1286 1800.37ZM1286.18 1792.01L1778.65 1162.07L821.959 1140.98L1286.18 1792.01Z"
        fill={color || "black"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.940466 1155.81L1057.32 1863.88L979.761 343.896L0.940466 1155.81ZM9.28546 1155.38L1051.82 1854.17L975.276 354.113L9.28546 1155.38Z"
        fill={color || "black"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1591.16 532.886L693.597 696.211L1492.96 1439.88L1591.16 532.886ZM1585.46 539.004L704.306 699.344L1489.07 1429.43L1585.46 539.004Z"
        fill={color || "black"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3117.6 450.939L2672.57 1135.22L3656.59 1078.19L3117.6 450.939ZM3118.2 459.317L2682.26 1129.62L3646.18 1073.75L3118.2 459.317Z"
        fill={color || "black"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4470.31 992.834L3341.56 368.951L3562.46 1884.46L4470.31 992.834ZM4461.96 993.932L3348 378.226L3566.01 1873.87L4461.96 993.932Z"
        fill={color || "black"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2929.94 1744.45L3817.06 1508.71L2943.39 828.498L2929.94 1744.45ZM2935.09 1737.87L3806 1506.43L2948.29 838.651L2935.09 1737.87Z"
        fill={color || "black"}
      />
    </svg>
  );
}
