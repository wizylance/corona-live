import { observable, action } from "mobx";
// import { db } from '../components/firebase/firebase';

export enum ViewMode {
  DARK_MODE = "DARK_MODE",
  LIGHT_MODE = "LIGHT_MODE",
}

export class AppState {
  @observable
  viewMode: ViewMode = ViewMode.LIGHT_MODE;

  @action changeViewMode = (viewMode: ViewMode) => {
    this.viewMode = viewMode;
  };
}
