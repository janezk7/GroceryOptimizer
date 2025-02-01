import { create } from "zustand";
import { authService } from "../services/authServiceFactory";

type TabIndex = 0|1|2

interface NavigationStore {
  tabIndex: TabIndex,
  setTabIndex: (index:TabIndex) => void
}

const useNavigationStore = create<NavigationStore>((set, get) => ({
  tabIndex: 0,
  setTabIndex: (index:TabIndex) => {
    set({tabIndex: index})
  }
}));

export default useNavigationStore;
