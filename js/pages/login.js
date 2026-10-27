import React, { useLayoutEffect, useState } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ loginId: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  useLayoutEffect(() => runPageScripts("login"), []);

  return (
    <PageLayout
      page="login"
      bodyClass="text-gray-800 font-sans relative min-h-screen bg-gray-50 flex flex-col justify-between"
      headerClass="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-6"
      footerClass="text-white pt-10 pb-6 border-t-4 border-irctc-orange relative z-30 w-full shadow-xl mt-auto"
      hasHeader={true}
      customHeader={false}
      hasFooter={true}
      externalScripts={[]}
    >
      <style>{"\n    @keyframes trackMove {\n        0% { left: 0%; opacity: 1; }\n        95% { left: calc(100% - 16px); opacity: 1; }\n        100% { left: 0%; opacity: 0; }\n    }\n    #trackTrain {\n        animation: trackMove 60s linear infinite;\n    }\n    "}</style>
    {"\n\n    "}
    {"\n\n    "}
    <main className="w-full grow flex items-center justify-center px-4 md:px-8 py-8">
      {"\n        "}
      <div className="max-w-275 w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
        {"\n\n            "}
        <div className="hidden lg:flex lg:w-2/5 bg-irctc-blue flex-col justify-between p-10 text-white relative overflow-hidden">
          {"\n                "}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full" />
          {"\n                \n                "}
          <div className="flex items-center gap-2">
            {"\n                    "}
            <span className="text-2xl font-bold tracking-tight">
              {"IRCTC "}
              <span className="text-irctc-orange">
                {"RailConnect"}
              </span>
            </span>
            {"\n                "}
          </div>
          {"\n\n                "}
          <div>
            {"\n                    "}
            <span className="text-irctc-orange text-xs font-bold tracking-widest uppercase">
              {"Ready for your next journey?"}
            </span>
            {"\n                    "}
            <h1 className="text-3xl font-bold mt-2 mb-3 leading-snug">
              {"Your journey, sorted."}
            </h1>
            {"\n                    "}
            <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
              {"\n                        Sign in to pick up where you left off and keep track of your upcoming trips securely.\n                    "}
            </p>
            {"\n\n                    "}
            <div className="mt-8">
              {"\n                        "}
              <div className="relative h-px bg-white/25">
                {"\n                            "}
                <span className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-irctc-orange" />
                {"\n                            "}
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/60" />
                {"\n                            "}
                <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-irctc-orange" />
                {"\n\n                            "}
                <div id="trackTrain" className="absolute -top-2 left-0">
                  {"\n                                "}
                  <svg className="w-4 h-4 text-irctc-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {"\n                                    "}
                    <path d="M4 15V6a2 2 0 012-2h12a2 2 0 012 2v9a4 4 0 01-4 4H8a4 4 0 01-4-4z" />
                    {"\n                                    "}
                    <path d="M4 11h16" />
                    {"\n                                    "}
                    <circle cx="8.5" cy="17.5" r=".6" fill="currentColor" />
                    {"\n                                    "}
                    <circle cx="15.5" cy="17.5" r=".6" fill="currentColor" />
                    {"\n                                "}
                  </svg>
                  {"\n                            "}
                </div>
                {"\n                        "}
              </div>
              {"\n                        "}
              <div className="flex justify-between text-[10px] tracking-widest text-blue-100/60 uppercase mt-2">
                {"\n                            "}
                <span>
                  {"Origin"}
                </span>
                {"\n                            "}
                <span>
                  {"En route"}
                </span>
                {"\n                            "}
                <span>
                  {"Destination"}
                </span>
                {"\n                        "}
              </div>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
          {"\n\n                "}
          <p className="text-blue-100/50 text-xs">
            {"From booking to boarding, we've got you covered."}
          </p>
          {"\n            "}
        </div>
        {"\n\n            "}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-10">
          {"\n                "}
          <div className="w-full max-w-sm bg-white rounded-2xl relative">
            {"\n\n                    "}
            <div className="flex items-center justify-between pb-4">
              {"\n                        "}
              <div>
                {"\n                            "}
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                  {"Boarding pass · Auth"}
                </p>
                {"\n                            "}
                <p className="text-xl font-bold text-irctc-blue">
                  {"Sign In"}
                </p>
                {"\n                        "}
              </div>
              {"\n                        "}
              <span className="text-[10px] font-bold text-irctc-orange border border-irctc-orange/40 bg-orange-50 px-2.5 py-1 rounded-full">
                {"WELCOME ABOARD"}
              </span>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="relative my-2">
              {"\n                        "}
              <div className="border-t-2 border-dashed border-gray-200" />
              {"\n                        "}
              <span className="absolute -left-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-50" />
              {"\n                        "}
              <span className="absolute -right-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-50" />
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="pt-4">
              {"\n                        "}
              <p className="text-xs text-gray-500 mb-5">
                {"Enter your credentials to access your bookings and dashboard."}
              </p>
              {"\n\n                        "}
              <form id="loginForm" className="space-y-4">
                {"\n                            "}
                <div>
                  {"\n                                "}
                  <label htmlFor="loginId" className="block text-xs font-semibold text-gray-700 mb-1">
                    {"Email or mobile number"}
                  </label>
                  {"\n                                "}
                  <div className="relative">
                    {"\n                                    "}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      {"\n                                        "}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {"\n                                    "}
                    </span>
                    {"\n                                    "}
                    <input type="text" id="loginId" name="loginId" placeholder="you@example.com or 9XXXXXXXXX" value={credentials.loginId} onChange={(event) => setCredentials({ ...credentials, loginId: event.target.value })} className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                "}
                  </div>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <div>
                  {"\n                                "}
                  <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1">
                    {"Password"}
                  </label>
                  {"\n                                "}
                  <div className="relative">
                    {"\n                                    "}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      {"\n                                        "}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {"\n                                    "}
                    </span>
                    {"\n                                    "}
                    <input type={passwordVisible ? "text" : "password"} id="password" name="password" placeholder="Enter your password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} className="w-full border border-gray-300 rounded-lg pl-10 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                    "}
                    <button type="button" id="togglePassword" aria-label={passwordVisible ? "Hide password" : "Show password"} onClick={() => setPasswordVisible((visible) => !visible)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-irctc-blue">
                      {"\n                                        "}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {"\n                                    "}
                    </button>
                    {"\n                                "}
                  </div>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <div className="flex items-center justify-between text-xs">
                  {"\n                                "}
                  <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                    {"\n                                    "}
                    <input type="checkbox" name="remember" className="accent-irctc-blue w-4 h-4 rounded" />
                    {"\n                                    Keep me signed in\n                                "}
                  </label>
                  {"\n                                "}
                  <a href="forgot-password.html" className="text-irctc-blue font-semibold hover:underline">
                    {"Forgot password?"}
                  </a>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <button type="submit" className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-sm">
                  {"\n                                Sign In & Board\n                            "}
                </button>
                {"\n                        "}
              </form>
              {"\n\n                        "}
              <p className="text-center text-xs text-gray-500 mt-5">
                {"\n                            New to IRCTC?\n                            "}
                <a href="signup.html" className="text-irctc-blue font-bold hover:underline">
                  {"Create an account"}
                </a>
                {"\n                        "}
              </p>
              {"\n                    "}
            </div>
            {"\n                "}
          </div>
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
    {"\n\n"}
    </PageLayout>
  );
}
