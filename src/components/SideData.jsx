import { Suggested } from "./Suggested";
import { SwitchProfile } from "./SwitchProfile";
import { loadUsers,getUserLogin } from '../store/actions/user.actions';
import { useEffect } from 'react';
import { AppFooterSide } from "./AppFooterSide";

export function SideData() {

    useEffect(() => {
        loadUsers()
    }, [])

   
    return (
        <section className="sideData-container">
            <div className="flex-sideData-container">
                <SwitchProfile></SwitchProfile>
                <Suggested></Suggested>
                <AppFooterSide></AppFooterSide>
            </div>
        </section>
    )
}

