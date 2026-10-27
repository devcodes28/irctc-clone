import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function HolidaysPage() {
  useLayoutEffect(() => runPageScripts("holidays"), []);

  return (
    <PageLayout
      page="holidays"
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
    <main className="w-full relative z-10 px-4 md:px-6 py-6 md:py-10 grow">
      {"\n        "}
      <div className="max-w-300 w-full mx-auto">
        {"\n            "}
        <div className="text-center mb-10">
          {"\n                "}
          <h1 className="text-3xl md:text-4xl font-black text-irctc-blue mb-3">
            {"Discover Incredible India"}
          </h1>
          {"\n                "}
          <p className="text-gray-600 max-w-2xl mx-auto">
            {"Explore our curated tour packages, from spiritual journeys to luxury train experiences."}
          </p>
          {"\n            "}
        </div>
        {"\n\n            "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {"\n                "}
          {"\n                "}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition">
            {"\n                    "}
            <div className="h-48 bg-gray-200 bg-cover bg-center" style={{"backgroundImage": "url('../assets/images/Golden Temple.jpg')"}} />
            {"\n                    "}
            <div className="p-6">
              {"\n                        "}
              <div className="text-xs font-bold text-irctc-orange uppercase tracking-wide mb-2">
                {"Golden Temple"}
              </div>
              {"\n                        "}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {"Delhi - Amritsar - Jaipur"}
              </h3>
              {"\n                        "}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {"Experience the rich heritage of India with this classic 5-day tour covering the iconic Golden Temple."}
              </p>
              {"\n                        "}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <p className="text-[10px] text-gray-400 uppercase">
                    {"Starting from"}
                  </p>
                  {"\n                                "}
                  <p className="text-lg font-black text-irctc-blue">
                    {"₹14,500"}
                  </p>
                  {"\n                            "}
                </div>
                {"\n                            "}
                <button className="bg-irctc-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition" onClick={(event) => runLegacyAction(event, "openBookingModal('Delhi - Amritsar - Jaipur', 14500)")}>
                  {"View Details"}
                </button>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition">
            {"\n                    "}
            <div className="h-48 bg-gray-200 bg-cover bg-center" style={{"backgroundImage": "url('../assets/images/Vaishno Devi.jpg')"}} />
            {"\n                    "}
            <div className="p-6">
              {"\n                        "}
              <div className="text-xs font-bold text-irctc-orange uppercase tracking-wide mb-2">
                {"Spiritual Journey"}
              </div>
              {"\n                        "}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {"South India Temple Tour"}
              </h3>
              {"\n                        "}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {"A divine 7-day journey through the magnificent temples of Madurai, Rameswaram, and Kanyakumari."}
              </p>
              {"\n                        "}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <p className="text-[10px] text-gray-400 uppercase">
                    {"Starting from"}
                  </p>
                  {"\n                                "}
                  <p className="text-lg font-black text-irctc-blue">
                    {"₹18,200"}
                  </p>
                  {"\n                            "}
                </div>
                {"\n                            "}
                <button className="bg-irctc-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition" onClick={(event) => runLegacyAction(event, "openBookingModal('South India Temple Tour', 18200)")}>
                  {"View Details"}
                </button>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition">
            {"\n                    "}
            <div className="h-48 bg-gray-200 bg-cover bg-center" style={{"backgroundImage": "url('../assets/images/kerala backwaters.jpg')"}} />
            {"\n                    "}
            <div className="p-6">
              {"\n                        "}
              <div className="text-xs font-bold text-irctc-orange uppercase tracking-wide mb-2">
                {"Nature Retreat"}
              </div>
              {"\n                        "}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {"Kerala Backwaters"}
              </h3>
              {"\n                        "}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {"Relax in the serene backwaters of Alleppey and Munnar tea gardens on this peaceful 4-day getaway."}
              </p>
              {"\n                        "}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <p className="text-[10px] text-gray-400 uppercase">
                    {"Starting from"}
                  </p>
                  {"\n                                "}
                  <p className="text-lg font-black text-irctc-blue">
                    {"₹12,800"}
                  </p>
                  {"\n                            "}
                </div>
                {"\n                            "}
                <button className="bg-irctc-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition" onClick={(event) => runLegacyAction(event, "openBookingModal('Kerala Backwaters', 12800)")}>
                  {"View Details"}
                </button>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n            "}
        </div>
        {"\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n    "}
    <div id="bookingModal" className="fixed inset-0 z-50 hidden bg-gray-900/60 backdrop-blur-sm items-center justify-center p-4">
      {"\n        "}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {"\n            "}
        {"\n            "}
        <div className="bg-irctc-blue p-5 flex justify-between items-center text-white shrink-0">
          {"\n                "}
          <h2 className="text-xl font-bold">
            {"Book Holiday Package"}
          </h2>
          {"\n                "}
          <button className="text-blue-200 hover:text-white transition" onClick={(event) => runLegacyAction(event, "closeBookingModal()")}>
            {"\n                    "}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {"\n                "}
          </button>
          {"\n            "}
        </div>
        {"\n            \n            "}
        {"\n            "}
        <div className="p-6 overflow-y-auto">
          {"\n                "}
          <div className="mb-4 pb-4 border-b border-gray-100">
            {"\n                    "}
            <h3 id="modalPackageName" className="text-lg font-black text-gray-900 uppercase">
              {"Package Name"}
            </h3>
            {"\n                    "}
            <p className="text-sm text-gray-500 mt-0.5">
              {"Base Price: "}
              <span id="modalBasePrice" className="font-bold text-irctc-blue">
                {"₹0"}
              </span>
              {" per person"}
            </p>
            {"\n                "}
          </div>
          {"\n\n                "}
          <form id="holidayForm" className="space-y-4">
            {"\n                    "}
            <div className="grid grid-cols-2 gap-4">
              {"\n                        "}
              <div className="flex flex-col">
                {"\n                            "}
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  {"Travel Date"}
                </label>
                {"\n                            "}
                <input type="date" id="h_date" className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm" />
                {"\n                        "}
              </div>
              {"\n                        "}
              <div className="flex flex-col">
                {"\n                            "}
                <label className="text-xs font-semibold text-gray-600 mb-1">
                  {"No. of Travelers"}
                </label>
                {"\n                            "}
                <input type="number" id="h_travelers" min="1" max="10" defaultValue="1" onChange={(event) => runLegacyAction(event, "updateTotal()")} className="border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-irctc-blue outline-none text-sm" />
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="flex flex-col">
              {"\n                        "}
              <label className="text-xs font-semibold text-gray-600 mb-1">
                {"Contact Email"}
              </label>
              {"\n                        "}
              <input type="email" id="h_email" className="border border-gray-300 bg-gray-50 rounded p-2.5 outline-none text-sm font-medium text-gray-500" />
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3.5">
              {"\n                        "}
              <div className="flex justify-between items-center">
                {"\n                            "}
                <span className="text-sm font-semibold text-gray-700">
                  {"Total Package Cost"}
                </span>
                {"\n                            "}
                <span id="modalTotalCost" className="text-xl font-black text-irctc-orange">
                  {"₹0"}
                </span>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            {"\n                    "}
            <div>
              {"\n                        "}
              <p className="font-bold text-gray-900 mb-2 text-sm">
                {"Payment Mode"}
              </p>
              {"\n                        "}
              <div className="space-y-2">
                {"\n                            "}
                <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                  {"\n                                "}
                  <input type="radio" name="paymentMode" defaultValue="ewallet" className="accent-irctc-orange w-4 h-4" />
                  {"\n                                "}
                  <div className="flex-1 flex justify-between items-center">
                    {"\n                                    "}
                    <span className="font-semibold">
                      {"IRCTC E-Wallet"}
                    </span>
                    {"\n                                    "}
                    <span id="modalWalletBalance" className="text-xs font-bold text-gray-500">
                      {"Bal: ₹0.00"}
                    </span>
                    {"\n                                "}
                  </div>
                  {"\n                            "}
                </label>
                {"\n                            \n                            "}
                <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                  {"\n                                "}
                  <input type="radio" name="paymentMode" defaultValue="upi" className="accent-irctc-orange w-4 h-4" />
                  {"\n                                "}
                  <span className="font-semibold text-gray-700">
                    {"UPI / BHIM (Mock)"}
                  </span>
                  {"\n                            "}
                </label>
                {"\n                            \n                            "}
                <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                  {"\n                                "}
                  <input type="radio" name="paymentMode" defaultValue="card" className="accent-irctc-orange w-4 h-4" />
                  {"\n                                "}
                  <span className="font-semibold text-gray-700">
                    {"Credit / Debit Card (Mock)"}
                  </span>
                  {"\n                            "}
                </label>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="flex gap-3 pt-2">
              {"\n                        "}
              <button type="button" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg transition-colors text-sm" onClick={(event) => runLegacyAction(event, "closeBookingModal()")}>
                {"\n                            Cancel\n                        "}
              </button>
              {"\n                        "}
              <button type="button" className="flex-1 bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-sm transition-colors text-sm" onClick={(event) => runLegacyAction(event, "submitHolidayBooking()")}>
                {"\n                            Pay & Book\n                        "}
              </button>
              {"\n                    "}
            </div>
            {"\n                "}
          </form>
          {"\n            "}
        </div>
        {"\n        "}
      </div>
      {"\n    "}
    </div>
    {"\n\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n"}
    </PageLayout>
  );
}
