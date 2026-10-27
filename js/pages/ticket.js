import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function TicketPage() {
  useLayoutEffect(() => runPageScripts("ticket"), []);

  return (
    <PageLayout
      page="ticket"
      bodyClass="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col overflow-x-hidden"
      headerClass="w-full relative z-20 px-4 md:px-6 pt-4 md:pt-8 shrink-0 no-print"
      footerClass="text-white pt-10 pb-6 border-t-4 border-irctc-orange relative z-30 w-full shadow-xl shrink-0 mt-auto no-print"
      hasHeader={true}
      customHeader={false}
      hasFooter={true}
      externalScripts={[]}
    >
      <style>{"\n        /* Hide navbar and footer when printing */\n        @media print {\n            header, footer, .no-print { display: none !important; }\n            body { background-color: white !important; }\n            .ticket-container { border: none !important; box-shadow: none !important; }\n        }\n    "}</style>
    {"\n\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    <main className="w-full relative z-10 px-4 md:px-6 py-6 md:py-10 grow flex justify-center">
      {"\n        "}
      <div className="max-w-212.5 w-full">
        {"\n            \n            "}
        {"\n            "}
        <div className="flex justify-end gap-3 mb-4 no-print">
          {"\n                "}
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2" onClick={(event) => runLegacyAction(event, "window.print()")}>
            {"\n                    "}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            {"\n                    Print ERS\n                "}
          </button>
          {"\n            "}
        </div>
        {"\n\n            "}
        {"\n            "}
        <div className="ticket-container bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 p-8 md:p-10 relative overflow-hidden">
          {"\n                \n                "}
          {"\n                "}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            {"\n                    "}
            <span className="text-9xl font-black text-irctc-blue tracking-tighter transform -rotate-45">
              {"IRCTC"}
            </span>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6 relative z-10">
            {"\n                    "}
            <div>
              {"\n                        "}
              <h1 className="text-3xl font-black text-irctc-blue tracking-tight">
                {"IRCTC"}
              </h1>
              {"\n                        "}
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                {"Electronic Reservation Slip (ERS)"}
              </p>
              {"\n                        "}
              <div id="t_statusBadge" className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-black uppercase tracking-wide rounded-sm border border-green-300">
                {"\n                            CONFIRMED\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="text-right flex flex-col items-end">
              {"\n                        "}
              {"\n                        "}
              <div className="w-24 h-24 bg-white border border-gray-300 p-1 rounded inline-block">
                {"\n                            "}
                <img id="t_qrCode" src="" alt="Ticket QR Code" className="w-full h-full object-contain" />
                {"\n                        "}
              </div>
              {"\n                        "}
              <p className="text-[10px] text-gray-500 mt-1 font-semibold">
                {"Scan to Verify"}
              </p>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 relative z-10">
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">
                {"PNR No."}
              </p>
              {"\n                        "}
              <p id="t_pnr" className="text-lg font-black text-gray-900">
                {"--"}
              </p>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">
                {"Train No. & Name"}
              </p>
              {"\n                        "}
              <p id="t_trainInfo" className="text-sm font-bold text-gray-900 uppercase">
                {"--"}
              </p>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">
                {"Date of Journey"}
              </p>
              {"\n                        "}
              <p id="t_doj" className="text-sm font-bold text-gray-900">
                {"--"}
              </p>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">
                {"Class"}
              </p>
              {"\n                        "}
              <p id="t_class" className="text-sm font-bold text-gray-900">
                {"--"}
              </p>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            {"\n                    "}
            <div className="text-center md:text-left w-full md:w-auto">
              {"\n                        "}
              <p className="text-[11px] text-blue-600 uppercase tracking-wide font-bold">
                {"From"}
              </p>
              {"\n                        "}
              <p id="t_sourceCode" className="text-3xl font-black text-irctc-blue my-1">
                {"--"}
              </p>
              {"\n                        "}
              <p id="t_sourceName" className="text-xs text-gray-600 font-semibold uppercase">
                {"--"}
              </p>
              {"\n                        "}
              <p id="t_depTime" className="text-sm font-bold text-gray-900 mt-1">
                {"--"}
              </p>
              {"\n                    "}
            </div>
            {"\n                    \n                    "}
            <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
              {"\n                        "}
              <div className="w-full flex items-center">
                {"\n                            "}
                <div className="h-0.5 w-full bg-blue-200" />
                {"\n                            "}
                <svg className="w-6 h-6 text-blue-400 mx-2 shrink-0 transform rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {"\n                            "}
                <div className="h-0.5 w-full bg-blue-200" />
                {"\n                        "}
              </div>
              {"\n                        "}
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-2 bg-blue-50 px-2">
                {"Boarding"}
              </span>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="text-center md:text-right w-full md:w-auto">
              {"\n                        "}
              <p className="text-[11px] text-blue-600 uppercase tracking-wide font-bold">
                {"To"}
              </p>
              {"\n                        "}
              <p id="t_destCode" className="text-3xl font-black text-irctc-blue my-1">
                {"--"}
              </p>
              {"\n                        "}
              <p id="t_destName" className="text-xs text-gray-600 font-semibold uppercase">
                {"--"}
              </p>
              {"\n                        "}
              <p id="t_arrTime" className="text-sm font-bold text-gray-900 mt-1">
                {"--"}
              </p>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="mb-8 relative z-10">
            {"\n                    "}
            <h3 className="font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4 text-sm uppercase tracking-wide">
              {"Passenger Details"}
            </h3>
            {"\n                    "}
            <div className="overflow-x-auto">
              {"\n                        "}
              <table className="w-full text-left text-sm whitespace-nowrap">
                {"\n                            "}
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  {"\n                                "}
                  <tr>
                    {"\n                                    "}
                    <th className="px-4 py-3 font-semibold">
                      {"#"}
                    </th>
                    {"\n                                    "}
                    <th className="px-4 py-3 font-semibold">
                      {"Name"}
                    </th>
                    {"\n                                    "}
                    <th className="px-4 py-3 font-semibold">
                      {"Age"}
                    </th>
                    {"\n                                    "}
                    <th className="px-4 py-3 font-semibold">
                      {"Gender"}
                    </th>
                    {"\n                                    "}
                    <th className="px-4 py-3 font-semibold">
                      {"Booking Status"}
                    </th>
                    {"\n                                    "}
                    <th className="px-4 py-3 font-semibold text-right">
                      {"Coach / Seat / Berth"}
                    </th>
                    {"\n                                "}
                  </tr>
                  {"\n                            "}
                </thead>
                {"\n                            "}
                <tbody id="t_passengers" className="divide-y divide-gray-100">
                  {"\n                                "}
                  {"\n                            "}
                </tbody>
                {"\n                        "}
              </table>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {"\n                    "}
            <div>
              {"\n                        "}
              <h3 className="font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-3 text-sm uppercase tracking-wide">
                {"Payment Details"}
              </h3>
              {"\n                        "}
              <div className="space-y-2 text-sm text-gray-600">
                {"\n                            "}
                <div className="flex justify-between">
                  <span>
                    {"Ticket Fare"}
                  </span>
                  <span id="t_baseFare" className="font-semibold text-gray-900">
                    {"₹0.00"}
                  </span>
                </div>
                {"\n                            "}
                <div className="flex justify-between">
                  <span>
                    {"IRCTC Convenience Fee"}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {"₹35.40"}
                  </span>
                </div>
                {"\n                            "}
                <div className="flex justify-between">
                  <span>
                    {"Travel Insurance"}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {"₹0.35"}
                  </span>
                </div>
                {"\n                            "}
                <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-gray-900">
                  {"\n                                "}
                  <span>
                    {"Total Fare"}
                  </span>
                  <span id="t_totalFare">
                    {"₹0.00"}
                  </span>
                  {"\n                            "}
                </div>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="bg-gray-50 rounded p-4 text-[10px] text-gray-500 border border-gray-200 flex flex-col justify-center">
              {"\n                        "}
              <p className="font-bold text-gray-700 mb-1 uppercase">
                {"Important Instructions:"}
              </p>
              {"\n                        "}
              <ul className="list-disc pl-4 space-y-1">
                {"\n                            "}
                <li>
                  {"Prescribed original ID proof is required while travelling along with SMS/VRM/ERS."}
                </li>
                {"\n                            "}
                <li>
                  {"Passengers are advised not to carry inflammable/dangerous articles."}
                </li>
                {"\n                            "}
                <li>
                  {"Contact 139 for PNR, Fare and accommodation availability enquiries."}
                </li>
                {"\n                        "}
              </ul>
              {"\n                    "}
            </div>
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
    {"\n\n"}
    {"\n"}
    </PageLayout>
  );
}
