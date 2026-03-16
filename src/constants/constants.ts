import { SelectOption } from "@components/Select.component";
import { ClassType } from "@store/user/user.model";

export const CLASS_OPTIONS: SelectOption<ClassType>[] = [
	{ label: "3ème", value: "3eme" },
	{ label: "4ème", value: "4eme" },
	{ label: "5ème", value: "5eme" },
	{ label: "6ème", value: "6eme" },
];
