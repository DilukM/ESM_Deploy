import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Donors",
    "User",
    "Events",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "CurrentItems",
    "ReleaseItems",
    "Items",
    "Items_out",

    "TreeEvents",
    "Sponsors",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    adminSignIn: build.mutation({
      query: ({ email, password }) => ({
        url: "auth/signin",
        method: "POST",
        body: { email, password },
      }),
    }),

    // Signup endpoint
    adminSignUp: build.mutation({
      query: ({ name, email, phone, password }) => ({
        url: "users/signup",
        method: "POST",
        body: { name, email, phone, password },
      }),
    }),

    getDonors: build.query({
      query: () => `donors/gets`,
      providesTags: ["Donors"],
    }),
    getLeaderboard: build.query({
      query: () => `donors/leaderboard`,
      providesTags: ["Donors"],
    }),
    getDonor: build.query({
      query: (id) => `donors/donors/${id}`,
      providesTags: ["Donors"],
    }),
    deleteDonor: build.mutation({
      query: (donorId) => ({
        url: `donors/delete/${donorId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Donors"], // Invalidate the cache for "Donors" after deletion
    }),
    addDonor: build.mutation({
      query: ({ name, email, phone, password }) => ({
        url: `donors/add`,
        method: "POST",
        body: { name, email, phone, password },
      }),
      providesTags: ["Donors"],
    }),
    updateDonor: build.mutation({
      query: ({ donorId, name, email, phone, password }) => ({
        url: `donors/update/${donorId}`,
        method: "PUT",
        body: { name, email, phone, password },
      }),
      providesTags: ["Donors"],
    }),

    //Donation Events Start
    getDEvents: build.query({
      query: () => `donorevents/gets`,
      providesTags: ["Events"],
    }),
    getDEvent: build.query({
      query: (id) => `donorevents/events/${id}`,
      providesTags: ["Events"],
    }),
    deleteDEvent: build.mutation({
      query: (eventId) => ({
        url: `donorevents/delete/${eventId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Events"], // Invalidate the cache for "Donors" after deletion
    }),
    addDEvent: build.mutation({
      query: ({ eventDetails }) => ({
        url: `donorevents/add`,
        method: "POST",
        body: { eventDetails },
      }),
      providesTags: ["Events"],
    }),
    updateDEvent: build.mutation({
      query: ({ id, eventName, date, location }) => ({
        url: `donorevents/update/${id}`,
        method: "PUT",
        body: { id, eventName, date, location },
      }),
      providesTags: ["Events"],
    }),

    //Donation Events End

    //treeplantationEvent Start

    getTreeEvents: build.query({
      query: () => `treePlantationEvent/gets`,
      providesTags: ["TreeEvents"],
    }),
    getTreeEvent: build.query({
      query: (id) => `treePlantationEvent/events/${id}`,
      providesTags: ["TreeEvents"],
    }),
    deleteTreeEvent: build.mutation({
      query: (eventId) => ({
        url: `treePlantationEvent/delete/${eventId}`,
        method: "Delete",
      }),
      invalidatesTags: ["TreeEvents"], // Invalidate the cache for "Events" after deletion
    }),
    addTreeEvent: build.mutation({
      query: ({
        coverImage,
        eventID,
        eventName,
        eventDate,
        province,
        district,
        city,
        comments,
      }) => ({
        url: `treePlantationEvent/add`,
        method: "POST",
        body: {
          coverImage,
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          comments,
        }, // Prepare form data for file upload
      }),
      providesTags: ["TreeEvents"],
    }),
    updateTreeEvent: build.mutation({
      query: (eventDetails) => ({
        url: `treePlantationEvent/update/${eventDetails.eventId}`,
        method: "PUT",
        body: { eventDetails }, // Prepare form data for file upload
      }),
      providesTags: ["TreeEvents"],
    }),

    //treeplantationEvent End

    // Sponsor endpoints
    getSponsors: build.query({
      query: () => `sponsors/gets`,
      providesTags: ["Sponsors"],
    }),
    getSponsor: build.query({
      query: (id) => `sponsors/events/${id}`,
      providesTags: ["Sponsors"],
    }),
    deleteSponsor: build.mutation({
      query: (eventId) => ({
        url: `sponsors/delete/${eventId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Sponsors"], // Invalidate the cache for "Sponsors" after deletion
    }),
    addSponsor: build.mutation({
      query: ({
        eventID,
        eventName,
        eventDate,
        province,
        district,
        city,
        donations,
      }) => ({
        url: `sponsors/add`,
        method: "POST",
        body: {
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          donations,
        },
      }),
      providesTags: ["Sponsors"],
    }),
    updateSponsor: build.mutation({
      query: ({
        eventId,
        eventID,
        eventName,
        eventDate,
        province,
        district,
        city,
        donations,
      }) => ({
        url: `sponsors/update/${eventId}`,
        method: "PUT",
        body: {
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          donations,
        },
      }),
      providesTags: ["Sponsors"],
    }),

    //sponsor End

    //Items...

    getItems: build.query({
      query: () => `items/gets`,
      providesTags: ["Items"],
    }),
    getItem: build.query({
      query: (id) => `items/items/${id}`,
      providesTags: ["Items"],
    }),
    deleteItems: build.mutation({
      query: (itemID) => ({
        url: `items/delete/${itemID}`,
        method: "Delete",
      }),
      invalidatesTags: ["Items"], // Invalidate the cache for "Items" after deletion
    }),
    addItems: build.mutation({
      query: ({ itemId, itemName, quantity, donorId, date }) => ({
        url: `items/add`,
        method: "POST",
        body: { itemId, itemName, quantity, donorId, date },
      }),
      providesTags: ["Items"],
    }),
    updateItems: build.mutation({
      query: ({ itemID, itemName, quantity, donorId, date }) => ({
        url: `items/update/${itemID}`,
        method: "PUT",
        body: { itemID, itemName, quantity, donorId, date },
      }),
      providesTags: ["Items"],
    }),

    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDonorsQuery,
  useDeleteDonorMutation,
  useGetDonorQuery,
  useAddDonorMutation,
  useUpdateDonorMutation,
  useGetLeaderboardQuery,

  useGetDEventsQuery,
  useDeleteDEventMutation,
  useGetDEventQuery,
  useAddDEventMutation,
  useUpdateDEventMutation,

  useGetTreeEventsQuery,
  useDeleteTreeEventMutation,
  useGetTreeEventQuery,
  useAddTreeEventMutation,
  useUpdateTreeEventMutation,

  useGetSponsorsQuery,
  useDeleteSponsorMutation,
  useGetSponsorQuery,
  useAddSponsorMutation,
  useUpdateSponsorMutation,

  useGetItemssQuery,

  useGetItemsQuery,
  useDeleteItemsMutation,
  useGetItemQuery,
  useAddItemsMutation,
  useUpdateItemsMutation,

  useGetItemss_outQuery,
  useDeleteItems_outMutation,
  useGetItems_outQuery,
  useAddItems_outMutation,
  useUpdateItems_outMutation,

  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,

  useAdminSignInMutation,
  useAdminSignUpMutation,
} = api;
