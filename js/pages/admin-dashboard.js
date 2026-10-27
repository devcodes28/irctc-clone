import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function AdminDashboardPage() {
  useLayoutEffect(() => runPageScripts("admin-dashboard", ["https://cdn.jsdelivr.net/npm/chart.js"]), []);

  return (
    <PageLayout
      page="admin-dashboard"
      bodyClass="bg-gray-50 font-sans m-0 min-h-screen flex flex-col"
      headerClass=""
      footerClass=""
      hasHeader={false}
      customHeader={true}
      hasFooter={false}
      externalScripts={["https://cdn.jsdelivr.net/npm/chart.js"]}
    >
    {"\n\n    "}
    {"\n    "}
    <header className="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-6 shrink-0">
      {"\n        "}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border-t-4 border-irctc-blue p-4 flex items-center justify-between">
        {"\n            "}
        <div className="flex items-center">
          {"\n                "}
          <span className="text-3xl font-bold text-irctc-blue">
            {"IRCTC"}
          </span>
          {"\n                "}
          <span className="text-3xl font-bold text-irctc-orange ml-2">
            {"Admin"}
          </span>
          {"\n            "}
        </div>
        {"\n            "}
        <div className="flex items-center space-x-4">
          {"\n                "}
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded text-xs font-bold text-green-700 uppercase">
            {"\n                    "}
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {"\n                    System Online\n                "}
          </div>
          {"\n                "}
          <button className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-1.5 px-4 rounded transition text-sm" onClick={(event) => runLegacyAction(event, "logout()")}>
            {"\n                    Logout\n                "}
          </button>
          {"\n            "}
        </div>
        {"\n        "}
      </div>
      {"\n    "}
    </header>
    {"\n\n    "}
    {"\n    "}
    <main className="w-full relative z-10 px-4 md:px-8 py-6 grow">
      {"\n        "}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {"\n            \n            "}
        {"\n            "}
        <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-4 border border-gray-200 h-fit">
          {"\n                "}
          <ul className="space-y-2">
            {"\n                    "}
            <li>
              <button id="nav-overview" className="w-full text-left px-4 py-3 bg-blue-50 text-irctc-blue font-bold rounded border-l-4 border-irctc-blue transition" onClick={(event) => runLegacyAction(event, "switchTab('overview')")}>
                {"Dashboard Overview"}
              </button>
            </li>
            {"\n                    "}
            <li>
              <button id="nav-trains" className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-irctc-orange font-semibold rounded transition" onClick={(event) => runLegacyAction(event, "switchTab('trains')")}>
                {"Manage Trains"}
              </button>
            </li>
            {"\n                    "}
            <li>
              <button id="nav-users" className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-irctc-orange font-semibold rounded transition" onClick={(event) => runLegacyAction(event, "switchTab('users')")}>
                {"Manage Users"}
              </button>
            </li>
            {"\n                    "}
            <li>
              <button id="nav-alerts" className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-irctc-orange font-semibold rounded transition" onClick={(event) => runLegacyAction(event, "switchTab('alerts')")}>
                {"Broadcast Alerts"}
              </button>
            </li>
            {"\n                "}
          </ul>
          {"\n            "}
        </div>
        {"\n\n            "}
        {"\n            "}
        <div className="md:col-span-3 space-y-6">
          {"\n                \n                "}
          {"\n                "}
          <div id="tab-overview" className="space-y-6">
            {"\n                    \n                    "}
            {"\n                    "}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {"\n                        "}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {"\n                            "}
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                  {"Total Users"}
                </p>
                {"\n                            "}
                <h3 className="text-3xl font-bold text-irctc-blue mt-1" id="stat-users">
                  {"--"}
                </h3>
                {"\n                        "}
              </div>
              {"\n                        "}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {"\n                            "}
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                  {"Active Bookings"}
                </p>
                {"\n                            "}
                <h3 className="text-3xl font-bold text-irctc-orange mt-1" id="stat-bookings">
                  {"--"}
                </h3>
                {"\n                        "}
              </div>
              {"\n                        "}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {"\n                            "}
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                  {"Trains Indexed"}
                </p>
                {"\n                            "}
                <h3 className="text-3xl font-bold text-green-600 mt-1" id="stat-trains">
                  {"--"}
                </h3>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            {"\n                    "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {"\n                        "}
              {"\n                        "}
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {"\n                            "}
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {"Database Activity Trend"}
                </h2>
                {"\n                            "}
                <div className="w-full h-64">
                  {"\n                                "}
                  <canvas id="bookingChart" />
                  {"\n                            "}
                </div>
                {"\n                        "}
              </div>
              {"\n                        \n                        "}
              {"\n                        "}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {"\n                            "}
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {"Tickets by Class"}
                </h2>
                {"\n                            "}
                <div className="w-full h-52 flex justify-center mt-4">
                  {"\n                                "}
                  <canvas id="classChart" />
                  {"\n                            "}
                </div>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            {"\n                    "}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {"\n                        "}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                {"\n                            "}
                <h2 className="text-lg font-bold text-gray-800">
                  {"Live Database Bookings"}
                </h2>
                {"\n                        "}
              </div>
              {"\n                        "}
              <div className="p-0 overflow-x-auto">
                {"\n                            "}
                <table className="w-full text-left text-sm text-gray-700">
                  {"\n                                "}
                  <thead className="bg-white text-xs uppercase font-bold text-gray-500 border-b border-gray-200">
                    {"\n                                    "}
                    <tr>
                      {"\n                                        "}
                      <th className="p-4">
                        {"Booking ID / PNR"}
                      </th>
                      {"\n                                        "}
                      <th className="p-4">
                        {"Passenger"}
                      </th>
                      {"\n                                        "}
                      <th className="p-4">
                        {"Train Info"}
                      </th>
                      {"\n                                        "}
                      <th className="p-4 text-right">
                        {"Status"}
                      </th>
                      {"\n                                    "}
                    </tr>
                    {"\n                                "}
                  </thead>
                  {"\n                                "}
                  <tbody id="liveBookingsTable" className="divide-y divide-gray-100">
                    {"\n                                    "}
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-gray-400">
                        {"Loading database records..."}
                      </td>
                    </tr>
                    {"\n                                "}
                  </tbody>
                  {"\n                            "}
                </table>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div id="tab-trains" className="hidden space-y-4">
            {"\n                    "}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
              {"\n                        "}
              <h2 className="text-lg font-bold text-gray-800">
                {"Train Schedule Management"}
              </h2>
              {"\n                        "}
              <button className="bg-irctc-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded text-sm transition" onClick={(event) => runLegacyAction(event, "openTrainModal()")}>
                {"+ Add New Train"}
              </button>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              {"\n                        "}
              <table className="w-full text-left text-sm text-gray-700">
                {"\n                            "}
                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-600 border-b border-gray-200">
                  {"\n                                "}
                  <tr>
                    <th className="p-3">
                      {"Train No."}
                    </th>
                    <th className="p-3">
                      {"Train Name"}
                    </th>
                    <th className="p-3">
                      {"Route"}
                    </th>
                    <th className="p-3">
                      {"Timing"}
                    </th>
                    <th className="p-3 text-right">
                      {"Actions"}
                    </th>
                  </tr>
                  {"\n                            "}
                </thead>
                {"\n                            "}
                <tbody id="trainsTableBody" className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-400">
                      {"Loading..."}
                    </td>
                  </tr>
                </tbody>
                {"\n                        "}
              </table>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div id="tab-users" className="hidden space-y-4">
            {"\n                    "}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
              {"\n                        "}
              <h2 className="text-lg font-bold text-gray-800">
                {"Registered Passengers & Accounts"}
              </h2>
              {"\n                        "}
              <input type="text" id="userSearch" onKeyup={(event) => runLegacyAction(event, "filterUsers()")} placeholder="Search user..." className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-irctc-blue" />
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              {"\n                        "}
              <table className="w-full text-left text-sm text-gray-700">
                {"\n                            "}
                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-600 border-b border-gray-200">
                  {"\n                                "}
                  <tr>
                    <th className="p-3">
                      {"Full Name"}
                    </th>
                    <th className="p-3">
                      {"Email Address"}
                    </th>
                    <th className="p-3">
                      {"Role"}
                    </th>
                    <th className="p-3 text-right">
                      {"Actions"}
                    </th>
                  </tr>
                  {"\n                            "}
                </thead>
                {"\n                            "}
                <tbody id="usersTableBody" className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-400">
                      {"Loading..."}
                    </td>
                  </tr>
                </tbody>
                {"\n                        "}
              </table>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          {"\n                "}
          <div id="tab-alerts" className="hidden space-y-6">
            {"\n                    "}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              {"\n                        "}
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {"Create System Broadcast"}
              </h2>
              {"\n                        "}
              <form id="addAlertForm" className="flex flex-col sm:flex-row gap-4">
                {"\n                            "}
                <input type="text" id="alertMsg" className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" placeholder="Enter broadcast message" />
                {"\n                            "}
                <select id="alertType" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue bg-white">
                  {"\n                                "}
                  <option value="info">
                    {"Info (Blue)"}
                  </option>
                  {"\n                                "}
                  <option value="warning">
                    {"Warning (Orange)"}
                  </option>
                  {"\n                                "}
                  <option value="critical">
                    {"Critical (Red)"}
                  </option>
                  {"\n                            "}
                </select>
                {"\n                            "}
                <button type="submit" className="bg-irctc-blue hover:bg-blue-900 text-white font-bold py-2 px-6 rounded transition text-sm">
                  {"Publish Alert"}
                </button>
                {"\n                        "}
              </form>
              {"\n                    "}
            </div>
            {"\n                    "}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              {"\n                        "}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="text-md font-bold text-gray-800">
                  {"Recent Broadcasts"}
                </h2>
              </div>
              {"\n                        "}
              <table className="w-full text-left text-sm text-gray-700">
                {"\n                            "}
                <thead className="bg-white text-xs uppercase font-bold text-gray-500 border-b border-gray-200">
                  {"\n                                "}
                  <tr>
                    <th className="p-4 w-1/6">
                      {"Type"}
                    </th>
                    <th className="p-4 w-3/4">
                      {"Message"}
                    </th>
                    <th className="p-4 w-1/6 text-right">
                      {"Actions"}
                    </th>
                  </tr>
                  {"\n                            "}
                </thead>
                {"\n                            "}
                <tbody id="alertsTableBody" className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-400">
                      {"Loading..."}
                    </td>
                  </tr>
                </tbody>
                {"\n                        "}
              </table>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n            "}
        </div>
        {"\n        "}
      </div>
      {"\n    "}
    </main>
    {"\n\n    "}
    {"\n    "}
    <div id="addTrainModal" className="fixed inset-0 bg-black/50 z-50 items-center justify-center hidden">
      {"\n        "}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4 relative">
        {"\n            "}
        <h3 className="text-lg font-bold text-irctc-blue border-b pb-2">
          {"Add New Railway Route"}
        </h3>
        {"\n            "}
        <form id="addTrainForm" className="grid grid-cols-2 gap-3 text-sm">
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Train Number"}
            </label>
            <input type="text" id="mTrainNum" className="w-full border rounded p-2" />
          </div>
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Train Name"}
            </label>
            <input type="text" id="mTrainName" className="w-full border rounded p-2" />
          </div>
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Origin Code"}
            </label>
            <input type="text" id="mOrigCode" placeholder="NDLS" className="w-full border rounded p-2 uppercase" />
          </div>
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Origin Name"}
            </label>
            <input type="text" id="mOrigName" placeholder="New Delhi" className="w-full border rounded p-2" />
          </div>
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Destination Code"}
            </label>
            <input type="text" id="mDestCode" placeholder="BCT" className="w-full border rounded p-2 uppercase" />
          </div>
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Destination Name"}
            </label>
            <input type="text" id="mDestName" placeholder="Mumbai Central" className="w-full border rounded p-2" />
          </div>
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Departure Time"}
            </label>
            <input type="text" id="mDepTime" placeholder="06:00" className="w-full border rounded p-2" />
          </div>
          {"\n                "}
          <div>
            <label className="block font-bold text-xs text-gray-600 mb-1">
              {"Arrival Time"}
            </label>
            <input type="text" id="mArrTime" placeholder="14:30" className="w-full border rounded p-2" />
          </div>
          {"\n                "}
          <div className="col-span-2 flex justify-end gap-2 pt-3 border-t mt-2">
            {"\n                    "}
            <button type="button" className="px-4 py-2 border rounded font-bold text-gray-600" onClick={(event) => runLegacyAction(event, "closeTrainModal()")}>
              {"Cancel"}
            </button>
            {"\n                    "}
            <button type="submit" className="px-4 py-2 bg-irctc-orange text-white font-bold rounded">
              {"Save Route"}
            </button>
            {"\n                "}
          </div>
          {"\n            "}
        </form>
        {"\n        "}
      </div>
      {"\n    "}
    </div>
    {"\n\n    "}
    {"\n"}
    </PageLayout>
  );
}
