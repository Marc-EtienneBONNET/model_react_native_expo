import { EnumGap } from "../../../themes/spacing";
import { Box } from "../box";
import type { TypeVStackProps } from "./type/typeVStackProps";

export function VStack({ style, gap = EnumGap.s, ...props }: TypeVStackProps) {
	return <Box flexDirection="column" gap={gap} {...props} style={style} />;
}
