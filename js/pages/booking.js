import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function BookingPage() {
  useLayoutEffect(() => runPageScripts("booking"), []);

  return (
    <PageLayout
      page="booking"
      bodyClass="text-gray-800 font-sans bg-gray-50 m-0 min-h-screen flex flex-col"
      headerClass="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-6 shrink-0"
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
      <div className="max-w-225 mx-auto space-y-6">
        {"\n            \n            "}
        <div className="flex justify-between items-center">
          {"\n                "}
          <h2 className="text-2xl font-black text-irctc-blue">
            {"Complete Your Ticket Booking"}
          </h2>
          {"\n                "}
          <button className="text-xs font-bold text-gray-500 hover:text-irctc-orange transition" onClick={(event) => runLegacyAction(event, "window.location.href='TrainSearch.html'")}>
            {"\n                    ← Back to Trains\n                "}
          </button>
          {"\n            "}
        </div>
        {"\n\n            "}
        {"\n            "}
        <div id="trainSummaryCard" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          {"\n                "}
          {"\n            "}
        </div>
        {"\n\n            "}
        {"\n            "}
        <form id="bookingForm" onSubmit={(event) => runLegacyAction(event, "handleBookingSubmission(event)")} className="space-y-6">
          {"\n                "}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            {"\n                    "}
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              {"\n                        "}
              <h3 className="text-lg font-bold text-irctc-blue">
                {"Passenger Details"}
              </h3>
              {"\n                        "}
              <button type="button" className="bg-blue-50 text-irctc-blue hover:bg-blue-100 font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1" onClick={(event) => runLegacyAction(event, "addPassengerRow()")}>
                {"\n                            + Add Passenger\n                        "}
              </button>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            {"\n                    "}
            <div id="passengerContainer" className="space-y-4">
              {"\n                        "}
              {"\n                        "}
              <div className="passenger-row grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 relative">
                {"\n                            "}
                <div className="sm:col-span-5">
                  {"\n                                "}
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    {"Full Name"}
                  </label>
                  {"\n                                "}
                  <input type="text" name="p_name" placeholder="Passenger Name" className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none" />
                  {"\n                            "}
                </div>
                {"\n                            "}
                <div className="sm:col-span-2">
                  {"\n                                "}
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    {"Age"}
                  </label>
                  {"\n                                "}
                  <input type="number" name="p_age" min="1" max="100" placeholder="Age" className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none" />
                  {"\n                            "}
                </div>
                {"\n                            "}
                <div className="sm:col-span-2">
                  {"\n                                "}
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    {"Gender"}
                  </label>
                  {"\n                                "}
                  <select name="p_gender" className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none">
                    {"\n                                    "}
                    <option value="Male">
                      {"Male"}
                    </option>
                    {"\n                                    "}
                    <option value="Female">
                      {"Female"}
                    </option>
                    {"\n                                    "}
                    <option value="Other">
                      {"Other"}
                    </option>
                    {"\n                                "}
                  </select>
                  {"\n                            "}
                </div>
                {"\n                            "}
                <div className="sm:col-span-3">
                  {"\n                                "}
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    {"Berth Preference"}
                  </label>
                  {"\n                                "}
                  <div className="flex items-center gap-2">
                    {"\n                                    "}
                    <select name="p_berth" className="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none">
                      {"\n                                        "}
                      <option value="No Preference">
                        {"No Preference"}
                      </option>
                      {"\n                                        "}
                      <option value="Lower">
                        {"Lower"}
                      </option>
                      {"\n                                        "}
                      <option value="Middle">
                        {"Middle"}
                      </option>
                      {"\n                                        "}
                      <option value="Upper">
                        {"Upper"}
                      </option>
                      {"\n                                        "}
                      <option value="Side Lower">
                        {"Side Lower"}
                      </option>
                      {"\n                                    "}
                    </select>
                    {"\n                                    "}
                    <button type="button" className="text-gray-400 hover:text-red-500 font-bold px-2 py-1 hidden remove-btn" onClick={(event) => runLegacyAction(event, "removePassengerRow(this)")}>
                      {"✕"}
                    </button>
                    {"\n                                "}
                  </div>
                  {"\n                            "}
                </div>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            {"\n                    "}
            <h3 className="text-lg font-bold text-irctc-blue pb-2 border-b">
              {"Payment & Summary"}
            </h3>
            {"\n                    \n                    "}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">
              {"\n                        "}
              <div>
                {"\n                            "}
                <p className="text-xs text-gray-600">
                  {"Total Calculated Fare"}
                </p>
                {"\n                            "}
                <p id="displayTotalFare" className="text-2xl font-black text-irctc-orange">
                  {"₹0.00"}
                </p>
                {"\n                        "}
              </div>
              {"\n                        "}
              <div className="text-right">
                {"\n                            "}
                <p className="text-xs text-gray-600">
                  {"Your E-Wallet Balance"}
                </p>
                {"\n                            "}
                <p id="displayWalletBal" className="text-sm font-bold text-irctc-blue">
                  {"₹0.00"}
                </p>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div>
              {"\n                        "}
              <p className="font-bold text-gray-900 mb-2 text-sm">
                {"Select Payment Mode"}
              </p>
              {"\n                        "}
              <div className="space-y-2">
                {"\n                            "}
                <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                  {"\n                                "}
                  <input type="radio" name="paymentMode" defaultValue="ewallet" className="accent-irctc-orange w-4 h-4" />
                  {"\n                                "}
                  <span className="font-semibold">
                    {"IRCTC E-Wallet"}
                  </span>
                  {"\n                            "}
                </label>
                {"\n                            "}
                <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                  {"\n                                "}
                  <input type="radio" name="paymentMode" defaultValue="upi" className="accent-irctc-orange w-4 h-4" />
                  {"\n                                "}
                  <span className="font-semibold text-gray-700">
                    {"UPI / BHIM (Mock Instant Pay)"}
                  </span>
                  {"\n                            "}
                </label>
                {"\n                            "}
                <label className="flex items-center gap-2 text-sm cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition">
                  {"\n                                "}
                  <input type="radio" name="paymentMode" defaultValue="card" className="accent-irctc-orange w-4 h-4" />
                  {"\n                                "}
                  <span className="font-semibold text-gray-700">
                    {"Credit / Debit Card (Mock Instant Pay)"}
                  </span>
                  {"\n                            "}
                </label>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="pt-4 flex justify-end gap-3">
              {"\n                        "}
              <button type="submit" className="w-full sm:w-auto bg-irctc-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-sm transition text-sm">
                {"\n                            Proceed to Pay & Book\n                        "}
              </button>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n            "}
        </form>
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
    {"\n"}
    </PageLayout>
  );
}
