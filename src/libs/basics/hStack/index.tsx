import { EnumGap } from "../../../themes/spacing";
import { Box } from "../box";
import type { TypeHStackProps } from "./type/typeHStackProps";

export function HStack({ gap = EnumGap.s, ...props }: TypeHStackProps) {
	return <Box flexDirection="row" gap={gap} {...props} />;
}
