import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function AlertsPage() {
  useLayoutEffect(() => runPageScripts("alerts"), []);

  return (
    <PageLayout
      page="alerts"
      bodyClass="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col"
      headerClass="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-8 shrink-0"
      footerClass="text-white pt-10 pb-6 border-t-4 border-irctc-orange relative z-30 w-full shadow-xl shrink-0 mt-auto"
      hasHeader={true}
      customHeader={false}
      hasFooter={true}
      externalScripts={[]}
    >
    {"\n\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
      {"\n        "}
      <div className="max-w-300 mx-auto space-y-6">
        {"\n            \n            "}
        <div className="bg-white p-6 shadow-md rounded-2xl border-t-4 border-irctc-blue">
          {"\n                "}
          <div className="flex justify-between items-center mb-6">
            {"\n                    "}
            <div>
              {"\n                        "}
              <h2 className="text-2xl font-bold text-irctc-blue">
                {"System & Account Alerts"}
              </h2>
              {"\n                        "}
              <p className="text-xs text-gray-500 mt-1">
                {"Stay updated with your latest transactions, booking statuses, and IRCTC advisories."}
              </p>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div id="alertsContainer" className="space-y-4">
            {"\n                    "}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500 text-sm">
              {"\n                        Loading alerts from database...\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n            "}
        </div>
        {"\n\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n    \n    "}
    {"\n    "}
    {"\n    "}
    {"\n\n"}
    </PageLayout>
  );
}
