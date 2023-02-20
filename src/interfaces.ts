import "@pnp/sp/fields";
import { IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";

export interface ISurveyUser {
    Title: string;
    Fullname: string;
    Email: string;
    Skills: IChoiceGroupOption[];
    DOB: Date;
}
