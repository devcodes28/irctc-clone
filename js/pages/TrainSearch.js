import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function TrainsearchPage() {
  useLayoutEffect(() => runPageScripts("TrainSearch"), []);

  return (
    <PageLayout
      page="TrainSearch"
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
        {"\n            "}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {"\n                "}
          <div className="bg-blue-900 text-white p-4 rounded-xl shadow-sm flex items-center justify-between">
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="text-xs text-blue-200 uppercase font-semibold">
                {"Bookings"}
              </p>
              {"\n                        "}
              <h4 className="font-bold text-base">
                {"Book Train Tickets"}
              </h4>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              {"\n                        "}
              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n                \n                "}
          <div className="bg-white hover:border-irctc-orange border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer transition group" onClick={(event) => runLegacyAction(event, "openPnrModal()")}>
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="text-xs text-gray-400 uppercase font-semibold">
                {"Enquiry"}
              </p>
              {"\n                        "}
              <h4 className="font-bold text-gray-900 group-hover:text-irctc-orange transition text-base">
                {"Check PNR Status"}
              </h4>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-irctc-orange flex items-center justify-center">
              {"\n                        "}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          <div className="bg-white hover:border-irctc-blue border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer transition group" onClick={(event) => runLegacyAction(event, "openScheduleModal()")}>
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="text-xs text-gray-400 uppercase font-semibold">
                {"Schedule"}
              </p>
              {"\n                        "}
              <h4 className="font-bold text-gray-900 group-hover:text-irctc-blue transition text-base">
                {"Train Schedule"}
              </h4>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-irctc-blue flex items-center justify-center">
              {"\n                        "}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n            "}
        </div>
        {"\n\n            "}
        {"\n            "}
        <div className="bg-white p-6 shadow-md rounded-2xl border-t-4 border-irctc-blue">
          {"\n                "}
          <h2 className="text-2xl font-bold text-irctc-blue mb-6">
            {"Book Ticket"}
          </h2>
          {"\n                \n                "}
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {"\n                    "}
            <div className="flex flex-col">
              {"\n                        "}
              <label className="text-gray-700 font-semibold mb-1 text-sm">
                {"From"}
              </label>
              {"\n                        "}
              <select id="sourceStation" className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm">
                {"\n                            "}
                <option value="">
                  {"Loading stations..."}
                </option>
                {"\n                        "}
              </select>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="flex flex-col">
              {"\n                        "}
              <label className="text-gray-700 font-semibold mb-1 text-sm">
                {"To"}
              </label>
              {"\n                        "}
              <select id="destStation" className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm">
                {"\n                            "}
                <option value="">
                  {"Loading stations..."}
                </option>
                {"\n                        "}
              </select>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="flex flex-col">
              {"\n                        "}
              <label className="text-gray-700 font-semibold mb-1 text-sm">
                {"Date"}
              </label>
              {"\n                        "}
              <input type="date" id="travelDate" className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue text-sm" />
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="flex flex-col">
              {"\n                        "}
              <label className="text-gray-700 font-semibold mb-1 text-sm">
                {"Class"}
              </label>
              {"\n                        "}
              <select id="travelClass" className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm">
                {"\n                            "}
                <option value="">
                  {"All Classes"}
                </option>
                {"\n                            "}
                <option value="SL">
                  {"Sleeper (SL)"}
                </option>
                {"\n                            "}
                <option value="3A">
                  {"AC 3 Tier (3A)"}
                </option>
                {"\n                            "}
                <option value="2A">
                  {"AC 2 Tier (2A)"}
                </option>
                {"\n                            "}
                <option value="1A">
                  {"AC First Class (1A)"}
                </option>
                {"\n                        "}
              </select>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="flex flex-col">
              {"\n                        "}
              <label className="text-gray-700 font-semibold mb-1 text-sm">
                {"Quota"}
              </label>
              {"\n                        "}
              <select className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white text-sm">
                {"\n                            "}
                <option>
                  {"General"}
                </option>
                {"\n                            "}
                <option>
                  {"Ladies"}
                </option>
                {"\n                            "}
                <option>
                  {"Tatkal"}
                </option>
                {"\n                            "}
                <option>
                  {"Senior Citizen"}
                </option>
                {"\n                        "}
              </select>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="flex items-end mt-2 lg:mt-0">
              {"\n                        "}
              <button type="button" id="searchTrainsBtn" className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded shadow transition-colors text-sm">
                {"\n                            Search Trains\n                        "}
              </button>
              {"\n                    "}
            </div>
            {"\n                "}
          </form>
          {"\n            "}
        </div>
        {"\n\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n    "}
    <div id="pnrModal" className="fixed inset-0 z-50 hidden bg-gray-900/60 backdrop-blur-sm items-center justify-center p-4">
      {"\n        "}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6">
        {"\n            "}
        <div className="flex justify-between items-center mb-4">
          {"\n                "}
          <h3 className="text-lg font-bold text-irctc-blue">
            {"Check PNR Status"}
          </h3>
          {"\n                "}
          <button className="text-gray-400 hover:text-gray-600 font-bold" onClick={(event) => runLegacyAction(event, "closeModals()")}>
            {"✕"}
          </button>
          {"\n            "}
        </div>
        {"\n            "}
        <p className="text-xs text-gray-500 mb-4">
          {"Enter your 10-digit PNR number to check current confirmation status and coach details."}
        </p>
        {"\n            "}
        <div className="space-y-3">
          {"\n                "}
          <input type="text" id="pnrInput" placeholder="e.g. 8493028491" maxLength="10" className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-irctc-blue outline-none" />
          {"\n                "}
          <button className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded text-sm transition" onClick={(event) => runLegacyAction(event, "checkPnrStatus()")}>
            {"Search PNR"}
          </button>
          {"\n            "}
        </div>
        {"\n            "}
        <div id="pnrResult" className="mt-4" />
        {"\n        "}
      </div>
      {"\n    "}
    </div>
    {"\n\n    "}
    {"\n    "}
    <div id="scheduleModal" className="fixed inset-0 z-50 hidden bg-gray-900/60 backdrop-blur-sm items-center justify-center p-4">
      {"\n        "}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6">
        {"\n            "}
        <div className="flex justify-between items-center mb-4">
          {"\n                "}
          <h3 className="text-lg font-bold text-irctc-blue">
            {"Train Schedule & Timings"}
          </h3>
          {"\n                "}
          <button className="text-gray-400 hover:text-gray-600 font-bold" onClick={(event) => runLegacyAction(event, "closeModals()")}>
            {"✕"}
          </button>
          {"\n            "}
        </div>
        {"\n            "}
        <p className="text-xs text-gray-500 mb-4">
          {"Select a train to view its complete route schedule and departure times."}
        </p>
        {"\n            "}
        <div className="space-y-3">
          {"\n                "}
          <select id="scheduleTrainSelect" className="w-full border border-gray-300 rounded p-3 text-sm bg-white focus:ring-2 focus:ring-irctc-blue outline-none">
            {"\n                    "}
            <option value="">
              {"Loading trains..."}
            </option>
            {"\n                "}
          </select>
          {"\n                "}
          <button className="w-full bg-irctc-blue hover:bg-blue-900 text-white font-bold py-2.5 rounded text-sm transition" onClick={(event) => runLegacyAction(event, "viewTrainSchedule()")}>
            {"View Schedule"}
          </button>
          {"\n            "}
        </div>
        {"\n            "}
        <div id="scheduleResult" className="mt-4" />
        {"\n        "}
      </div>
      {"\n    "}
    </div>
    {"\n\n    "}
    {"\n    \n    "}
    {"\n    "}
    {"\n    "}
    {"\n\n"}
    </PageLayout>
  );
}
