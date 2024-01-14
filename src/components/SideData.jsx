import { AppFooter } from "./AppFooter";
import { Suggested } from "./Suggested";
import { SwitchProfile } from "./switchProfile";

export function SideData() {

    return (
        <section className="sideDate-container">
            <div className="flex-sideDate-container">
                <SwitchProfile></SwitchProfile>
                <Suggested></Suggested>
                <AppFooter></AppFooter>
            </div>
        </section>
    )
}