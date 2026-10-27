import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function EWalletPage() {
  useLayoutEffect(() => runPageScripts("e-wallet"), []);

  return (
    <PageLayout
      page="e-wallet"
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
      <div className="max-w-200 mx-auto">
        {"\n            \n            "}
        <div className="bg-white p-8 shadow-md rounded-lg border-t-4 border-irctc-blue">
          {"\n                "}
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-6 mb-6">
            {"\n                    "}
            <div>
              {"\n                        "}
              <h2 className="text-2xl font-bold text-irctc-blue">
                {"IRCTC E-Wallet"}
              </h2>
              {"\n                        "}
              <p className="text-sm text-gray-500 mt-1">
                {"Manage your funds for seamless ticket booking."}
              </p>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="mt-4 md:mt-0 text-center md:text-right bg-blue-50 px-6 py-4 rounded-lg border border-blue-100">
              {"\n                        "}
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                {"Available Balance"}
              </p>
              {"\n                        "}
              <p id="displayBalance" className="text-3xl font-black text-irctc-blue mt-1">
                {"₹0.00"}
              </p>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          <div className="max-w-md">
            {"\n                    "}
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {"Top-up Wallet"}
            </h3>
            {"\n                    \n                    "}
            <form id="topupForm" className="space-y-5">
              {"\n                        "}
              <div className="flex flex-col">
                {"\n                            "}
                <label className="text-gray-700 font-semibold mb-2 text-sm">
                  {"Enter Amount (₹)"}
                </label>
                {"\n                            "}
                <input type="number" id="topupAmount" placeholder="e.g. 1000" min="100" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue font-bold text-lg" />
                {"\n                        "}
              </div>
              {"\n\n                        "}
              {"\n                        "}
              <div className="flex gap-3">
                {"\n                            "}
                <button type="button" className="flex-1 border border-gray-300 hover:border-irctc-orange hover:bg-orange-50 text-gray-700 font-semibold py-2 rounded-md transition text-sm" onClick={(event) => runLegacyAction(event, "setAmount(500)")}>
                  {"+ ₹500"}
                </button>
                {"\n                            "}
                <button type="button" className="flex-1 border border-gray-300 hover:border-irctc-orange hover:bg-orange-50 text-gray-700 font-semibold py-2 rounded-md transition text-sm" onClick={(event) => runLegacyAction(event, "setAmount(1000)")}>
                  {"+ ₹1000"}
                </button>
                {"\n                            "}
                <button type="button" className="flex-1 border border-gray-300 hover:border-irctc-orange hover:bg-orange-50 text-gray-700 font-semibold py-2 rounded-md transition text-sm" onClick={(event) => runLegacyAction(event, "setAmount(2000)")}>
                  {"+ ₹2000"}
                </button>
                {"\n                        "}
              </div>
              {"\n\n                        "}
              <button type="submit" className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-sm transition-colors mt-4">
                {"\n                            Proceed to Add Money\n                        "}
              </button>
              {"\n                    "}
            </form>
            {"\n                "}
          </div>
          {"\n            "}
        </div>
        {"\n\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n\n"}
    </PageLayout>
  );
}
