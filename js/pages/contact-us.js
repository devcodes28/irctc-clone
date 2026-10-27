import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function ContactUsPage() {
  useLayoutEffect(() => runPageScripts("contact-us"), []);

  return (
    <PageLayout
      page="contact-us"
      bodyClass="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col overflow-x-hidden"
      headerClass="w-full relative z-20 px-4 md:px-6 pt-4 md:pt-8 shrink-0"
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
    {"\n    "}
    <main className="w-full relative z-10 px-4 md:px-6 py-6 md:py-10 grow">
      {"\n        "}
      {"\n        "}
      <div className="max-w-250 w-full mx-auto flex flex-col md:flex-row items-start gap-8">
        {"\n            \n            "}
        {"\n            "}
        <div className="w-full md:w-1/3 space-y-6">
          {"\n                "}
          <div>
            {"\n                    "}
            <h2 className="text-2xl font-black text-irctc-blue mb-4">
              {"Get in touch"}
            </h2>
            {"\n                    "}
            <p className="text-sm text-gray-600">
              {"We are here to assist you with your booking queries, cancellations, and feedback."}
            </p>
            {"\n                "}
          </div>
          {"\n\n                "}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            {"\n                    "}
            <h3 className="font-bold text-gray-900 mb-2 border-b pb-2">
              {"Customer Care Numbers"}
            </h3>
            {"\n                    "}
            <p className="text-sm text-gray-600 mb-1">
              {"For general enquiries:"}
            </p>
            {"\n                    "}
            <p className="text-xl font-black text-irctc-blue mb-4">
              {"139"}
            </p>
            {"\n                    \n                    "}
            <p className="text-sm text-gray-600 mb-1">
              {"For e-ticketing queries:"}
            </p>
            {"\n                    "}
            <p className="text-lg font-bold text-gray-900">
              {"14646 / 0755-6610661"}
            </p>
            {"\n                "}
          </div>
          {"\n\n                "}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            {"\n                    "}
            <h3 className="font-bold text-gray-900 mb-2 border-b pb-2">
              {"Email Support"}
            </h3>
            {"\n                    "}
            <p className="text-sm text-gray-600 mb-1">
              {"E-ticketing queries:"}
            </p>
            {"\n                    "}
            <a href="mailto:care@irctc.co.in" className="text-irctc-orange font-bold text-sm hover:underline">
              {"care@irctc.co.in"}
            </a>
            {"\n                    \n                    "}
            <p className="text-sm text-gray-600 mt-3 mb-1">
              {"Cancellation queries:"}
            </p>
            {"\n                    "}
            <a href="mailto:etickets@irctc.co.in" className="text-irctc-orange font-bold text-sm hover:underline">
              {"etickets@irctc.co.in"}
            </a>
            {"\n                "}
          </div>
          {"\n            "}
        </div>
        {"\n\n            "}
        {"\n            "}
        <div className="w-full md:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          {"\n                "}
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {"Write to Us"}
          </h3>
          {"\n                \n               "}
          <form className="space-y-4" id="contactForm">
            {"\n    "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {"\n        "}
              <div className="flex flex-col">
                {"\n            "}
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  {"Full Name"}
                </label>
                {"\n            "}
                <input type="text" id="contactName" className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm" />
                {"\n        "}
              </div>
              {"\n        "}
              <div className="flex flex-col">
                {"\n            "}
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  {"Email Address"}
                </label>
                {"\n            "}
                <input type="email" id="contactEmail" className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm" />
                {"\n        "}
              </div>
              {"\n    "}
            </div>
            {"\n    \n    "}
            <div className="flex flex-col">
              {"\n        "}
              <label className="text-xs font-semibold text-gray-600 mb-1">
                {"Subject / PNR Number"}
              </label>
              {"\n        "}
              <input type="text" id="contactSubject" className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm" />
              {"\n    "}
            </div>
            {"\n    \n    "}
            <div className="flex flex-col">
              {"\n        "}
              <label className="text-xs font-semibold text-gray-600 mb-1">
                {"Message"}
              </label>
              {"\n        "}
              <textarea id="contactMessage" rows="5" className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm resize-none" />
              {"\n    "}
            </div>
            {"\n\n    "}
            <button type="submit" className="w-full bg-irctc-blue hover:bg-blue-900 text-white font-bold py-3 rounded-lg shadow-sm transition-colors mt-2">
              {"\n        Send Message\n    "}
            </button>
            {"\n"}
          </form>
          {"\n            "}
        </div>
        {"\n\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n    "}
    {"\n"}
    {"\n"}
    </PageLayout>
  );
}
