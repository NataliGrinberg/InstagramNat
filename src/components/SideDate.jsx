import { AppFooter } from "./AppFooter";
import { Suggested } from "./Suggested";
import { SwitchProfile } from "./switchProfile";

export function SideDate() {

    return (
        <div className="sideDate-container">
            <SwitchProfile></SwitchProfile>
            <Suggested></Suggested>
            <AppFooter></AppFooter>
        </div>
    )
}