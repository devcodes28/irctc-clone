import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function SearchResultsPage() {
  useLayoutEffect(() => runPageScripts("search-results"), []);

  return (
    <PageLayout
      page="search-results"
      bodyClass="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col"
      headerClass="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-8 shrink-0"
      footerClass=""
      hasHeader={true}
      customHeader={false}
      hasFooter={false}
      externalScripts={[]}
    >
    {"\n\n    "}
    {"\n    "}
    {"\n\n    "}
    <main className="w-full relative z-10 px-4 md:px-8 py-6 md:py-10 grow">
      {"\n        "}
      <div className="max-w-300 mx-auto">
        {"\n            \n            "}
        <section className="bg-white border border-gray-200 shadow-sm rounded-lg mb-6">
          {"\n                "}
          <div className="px-4 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {"\n                    "}
            <div>
              {"\n                        "}
              <div className="text-[11px] text-gray-500 uppercase tracking-wide">
                {"From"}
              </div>
              {"\n                        "}
              <div id="displaySource" className="font-bold text-irctc-blue">
                {"--"}
              </div>
              {"\n                    "}
            </div>
            {"\n                    "}
            <span className="text-gray-400">
              {"⟶"}
            </span>
            {"\n                    "}
            <div>
              {"\n                        "}
              <div className="text-[11px] text-gray-500 uppercase tracking-wide">
                {"To"}
              </div>
              {"\n                        "}
              <div id="displayDest" className="font-bold text-irctc-blue">
                {"--"}
              </div>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div>
              {"\n                        "}
              <div className="text-[11px] text-gray-500 uppercase tracking-wide">
                {"Date"}
              </div>
              {"\n                        "}
              <div id="displayDate" className="font-bold text-gray-800">
                {"--"}
              </div>
              {"\n                    "}
            </div>
            {"\n                    "}
            <button type="button" className="ml-auto bg-irctc-orange hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded transition-colors" onClick={(event) => runLegacyAction(event, "window.location.href='TrainSearch.html'")}>
              {"Modify Search"}
            </button>
            {"\n                "}
          </div>
          {"\n            "}
        </section>
        {"\n\n            "}
        <div className="flex flex-col md:flex-row gap-5">
          {"\n                "}
          <section className="flex-1 min-w-0">
            {"\n                    "}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 mb-4">
              {"\n                        "}
              <div className="flex items-center gap-4 text-sm overflow-x-auto">
                {"\n                            "}
                <span className="text-gray-500 shrink-0">
                  {"Sort by:"}
                </span>
                {"\n                            "}
                <button type="button" className="shrink-0 text-irctc-blue font-semibold">
                  {"Departure ↑"}
                </button>
                {"\n                        "}
              </div>
              {"\n                        "}
              <span id="resultsCount" className="text-xs text-gray-500 shrink-0" />
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div id="trainResultsList" className="flex flex-col gap-3" />
            {"\n\n                    "}
            <div id="noResults" className="hidden bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
              {"\n                        "}
              <p className="font-semibold text-gray-700 mb-1">
                {"No trains found"}
              </p>
              {"\n                        "}
              <p className="text-sm">
                {"Try removing a filter or choosing a different route."}
              </p>
              {"\n                    "}
            </div>
            {"\n                "}
          </section>
          {"\n            "}
        </div>
        {"\n\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n "}
    {"\n"}
    </PageLayout>
  );
}
