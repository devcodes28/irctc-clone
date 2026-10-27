import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function ProfilePage() {
  useLayoutEffect(() => runPageScripts("profile"), []);

  return (
    <PageLayout
      page="profile"
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
        <div className="flex justify-between items-center">
          {"\n                "}
          <h2 className="text-2xl font-bold text-irctc-blue">
            {"Account Profile"}
          </h2>
          {"\n                "}
          <a href="dashboard.html" className="text-sm font-semibold text-irctc-orange hover:underline">
            {"← Back to Dashboard"}
          </a>
          {"\n            "}
        </div>
        {"\n\n            "}
        <div className="bg-white shadow-md rounded-2xl border-t-4 border-irctc-blue overflow-hidden">
          {"\n                \n                "}
          {"\n                "}
          <div className="bg-irctc-blue p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {"                   \n                    "}
            <div className="flex items-center space-x-4">
              {"\n                        "}
              <div id="userAvatar" className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold tracking-wider uppercase shrink-0">
                {"\n                            --\n                        "}
              </div>
              {"\n                        "}
              <div>
                {"\n                            "}
                <h3 id="userNameDisplay" className="text-xl font-bold">
                  {"Loading..."}
                </h3>
                {"\n                            "}
                <p id="userIdDisplay" className="text-xs text-blue-200 mt-0.5">
                  {"IRCTC User ID: --"}
                </p>
                {"\n                            "}
                <span className="inline-block mt-2 bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {"Verified Account"}
                </span>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-5 py-3 text-left sm:text-right w-full sm:w-auto">
              {"\n                        "}
              <p className="text-xs text-blue-200 font-semibold uppercase tracking-wide">
                {"E-Wallet Balance"}
              </p>
              {"\n                        "}
              <p id="profileWalletBal" className="text-2xl font-black text-white mt-0.5">
                {"₹0.00"}
              </p>
              {"\n                        "}
              <a href="e-wallet.html" className="inline-block mt-1 text-xs text-irctc-orange font-bold hover:underline">
                {"Manage Wallet →"}
              </a>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="p-6 md:p-8">
            {"\n                    "}
            <h4 className="text-gray-900 font-bold mb-4 border-b border-gray-100 pb-2 text-sm uppercase tracking-wider">
              {"Personal Information"}
            </h4>
            {"\n                    \n                    "}
            <form id="profileForm" className="space-y-5">
              {"\n                        "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {"Full Name"}
                  </label>
                  {"\n                                "}
                  <input type="text" id="p_fullName" className="w-full border border-gray-300 rounded-lg p-3 focus:border-irctc-blue focus:ring-2 focus:ring-blue-100 outline-none transition text-sm font-semibold text-gray-800" />
                  {"\n                            "}
                </div>
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {"Date of Birth"}
                  </label>
                  {"\n                                "}
                  <input type="date" id="p_dob" className="w-full border border-gray-300 rounded-lg p-3 focus:border-irctc-blue focus:ring-2 focus:ring-blue-100 outline-none transition text-sm font-semibold text-gray-800" />
                  {"\n                            "}
                </div>
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {"Email Address"}
                  </label>
                  {"\n                                "}
                  <input type="email" id="p_email" className="w-full border border-gray-300 rounded-lg p-3 focus:border-irctc-blue focus:ring-2 focus:ring-blue-100 outline-none transition text-sm font-semibold text-gray-800" />
                  {"\n                            "}
                </div>
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {"Mobile Number"}
                  </label>
                  {"\n                                "}
                  <input type="tel" id="p_mobile" className="w-full border border-gray-300 rounded-lg p-3 focus:border-irctc-blue focus:ring-2 focus:ring-blue-100 outline-none transition text-sm font-semibold text-gray-800" />
                  {"\n                            "}
                </div>
                {"\n                        "}
              </div>
              {"\n\n                        "}
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
                {"\n                            "}
                <button type="submit" className="bg-irctc-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition shadow-sm text-sm">
                  {"\n                                Save Changes\n                            "}
                </button>
                {"\n                        "}
              </div>
              {"\n                    "}
            </form>
            {"\n                "}
          </div>
          {"\n\n            "}
        </div>
        {"\n\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n    "}
    {"\n    "}
    {"\n\n"}
    </PageLayout>
  );
}
