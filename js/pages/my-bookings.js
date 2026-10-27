import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function MyBookingsPage() {
  useLayoutEffect(() => runPageScripts("my-bookings"), []);

  return (
    <PageLayout
      page="my-bookings"
      bodyClass="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col"
      headerClass="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-8 shrink-0"
      footerClass="text-white pt-10 pb-6 border-t-4 border-irctc-orange relative z-30 w-full shadow-xl shrink-0 mt-auto"
      hasHeader={true}
      customHeader={false}
      hasFooter={true}
      externalScripts={[]}
    >
    {"    \n\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
      {"\n        "}
      <div className="max-w-250 mx-auto">
        {"\n            "}
        <h2 className="text-2xl font-bold text-irctc-blue mb-6">
          {"My Bookings"}
        </h2>
        {"\n            \n            "}
        <div id="bookingsContainer" className="space-y-6">
          {"\n                "}
          <div className="p-6 text-center text-gray-400">
            {"Loading bookings from database..."}
          </div>
          {"\n            "}
        </div>
        {"\n\n            "}
        <div id="emptyState" className="hidden bg-white rounded-lg shadow border border-gray-200 p-10 text-center">
          {"\n                "}
          <p className="text-gray-500 mb-4">
            {"You have no upcoming or past bookings."}
          </p>
          {"\n                "}
          <button className="bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition shadow-sm" onClick={(event) => runLegacyAction(event, "window.location.href='TrainSearch.html'")}>
            {"\n                    Book a Ticket\n                "}
          </button>
          {"\n            "}
        </div>
        {"\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n"}
    </PageLayout>
  );
}
