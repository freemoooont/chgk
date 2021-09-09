import { RootState } from "../../store";
import { LoadingStatus } from "../../types";
import { UserState } from "./contracts/state";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserData = (state: RootState): UserState["data"] =>
  selectUserState(state).data;
export const selectUserIsLoading = (state: RootState): boolean =>
  selectUserState(state).LoadingStatus === LoadingStatus.LOADING;
export const selectUserIsLoaded = (state: RootState): boolean =>
  selectUserState(state).LoadingStatus === LoadingStatus.SUCCESS;
export const selectIsAuth = (state: RootState): boolean =>
  selectUserState(state).isLoggedIn;
export const selectUserStatus = (
  state: RootState
): UserState["LoadingStatus"] => selectUserState(state).LoadingStatus;
export const selectUserMessage = (state: RootState): UserState["message"] =>
  selectUserState(state).message;

export const isUserHaveTeam = (state: RootState): boolean =>
  !!selectUserState(state).data?.user.roles?.find(
    (role) => role.code == "CAPITAN"
  );

export const isUserAdmin = (state: RootState): boolean =>
  !!selectUserState(state).data?.user.roles?.find(
    (role) => role.code == "ADMIN"
  );
