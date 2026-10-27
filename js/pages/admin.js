import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function AdminPage() {
  useLayoutEffect(() => runPageScripts("admin"), []);

  return (
    <PageLayout
      page="admin"
      bodyClass="bg-gray-900 flex items-center justify-center min-h-screen"
      headerClass=""
      footerClass=""
      hasHeader={false}
      customHeader={false}
      hasFooter={false}
      externalScripts={[]}
    >
    {"\n\n    "}
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
      {"\n        "}
      <div className="text-center mb-6">
        {"\n            "}
        <h1 className="text-3xl font-bold text-irctc-blue">
          {"IRCTC "}
          <span className="text-irctc-orange">
            {"Admin"}
          </span>
        </h1>
        {"\n            "}
        <p className="text-gray-500 text-sm mt-2">
          {"Restricted Access. Authorized personnel only."}
        </p>
        {"\n        "}
      </div>
      {"\n\n        "}
      <div className="space-y-4">
        {"\n            "}
        <div>
          {"\n                "}
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {"Admin Username"}
          </label>
          {"\n                "}
          <input type="text" id="adminUser" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
          {"\n            "}
        </div>
        {"\n            "}
        <div>
          {"\n                "}
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {"Password"}
          </label>
          {"\n                "}
          <input type="password" id="adminPass" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
          {"\n            "}
        </div>
        {"\n            "}
        <div id="errorMsg" className="text-red-500 text-xs hidden font-semibold">
          {"Invalid credentials."}
        </div>
        {"\n            \n            "}
        <button id="loginBtn" className="w-full bg-irctc-blue hover:bg-blue-900 text-white font-bold py-3 px-4 rounded transition-colors mt-4">
          {"\n                Access Terminal\n            "}
        </button>
        {"\n        "}
      </div>
      {"\n    "}
    </div>
    {"\n\n    "}
    {"\n"}
    </PageLayout>
  );
}
