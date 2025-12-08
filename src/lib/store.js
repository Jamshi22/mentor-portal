import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth";
import { usersApi } from "./services/user";
import { subscriptionsApi } from "./services/subscriptionPlans";
import { CouponRegister } from "./services/coupon";
import { paymentApi } from "./services/paymentservice";
import { paymentDropdownApi } from "./services/paymentdropdowns";
import { EmployeeRegister } from "./services/employeeRegister";
import { webinarApi } from "./services/webinar";
import { webinarRecored } from "./services/webinarRecorded";
import { ApplicationLinkRtk } from "./services/applicationLink";
import { newsAndUpdatesRTK } from "./services/newsAndUpdates";
import { CommunityLinkRTK } from "./services/communityLink";
import { ImportantLinkRtk } from "./services/importantLink";
// import {CouncelingLinkRTK} from './services/counselingLink'
import { CounselingLinkRTK } from "./services/counselingLink";
import { ExpertVideoRTK } from "./services/externalLink";
import { ClosingRankRTK } from "./services/Uploaderservice/DeleteClosingRank";
import { UploadClosingRankRTK } from "./services/Uploaderservice/UploadClosingRank";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
    [CouponRegister.reducerPath]: CouponRegister.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [paymentDropdownApi.reducerPath]: paymentDropdownApi.reducer,
    [EmployeeRegister.reducerPath]: EmployeeRegister.reducer,
    [webinarApi.reducerPath]: webinarApi.reducer,
    [webinarRecored.reducerPath]: webinarRecored.reducer,
    [ApplicationLinkRtk.reducerPath]: ApplicationLinkRtk.reducer,
    [newsAndUpdatesRTK.reducerPath]: newsAndUpdatesRTK.reducer,
    [CommunityLinkRTK.reducerPath]: CommunityLinkRTK.reducer,
    [ImportantLinkRtk.reducerPath]: ImportantLinkRtk.reducer,
    [CounselingLinkRTK.reducerPath]: CounselingLinkRTK.reducer,
    [ExpertVideoRTK.reducerPath]: ExpertVideoRTK.reducer,
    [ClosingRankRTK.reducerPath]: ClosingRankRTK.reducer,
    [UploadClosingRankRTK.reducerPath]: UploadClosingRankRTK.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      subscriptionsApi.middleware,
      CouponRegister.middleware,
      paymentApi.middleware,
      paymentDropdownApi.middleware,
      EmployeeRegister.middleware,
      webinarApi.middleware,
      webinarRecored.middleware,
      ApplicationLinkRtk.middleware,
      newsAndUpdatesRTK.middleware,
      CommunityLinkRTK.middleware,
      ImportantLinkRtk.middleware,
      CounselingLinkRTK.middleware,
      ExpertVideoRTK.middleware,
      ClosingRankRTK.middleware,
      UploadClosingRankRTK.middleware
    ),
});

setupListeners(store.dispatch);
