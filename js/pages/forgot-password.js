import React, { useLayoutEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function ForgotPasswordPage() {
  useLayoutEffect(() => runPageScripts("forgot-password"), []);

  return (
    <PageLayout
      page="forgot-password"
      bodyClass="text-gray-800 font-sans min-h-screen flex flex-col bg-irctc-light m-0"
      headerClass="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-6 shrink-0"
      footerClass="text-white pt-10 pb-6 border-t-4 border-irctc-orange relative z-30 w-full shadow-xl shrink-0 mt-auto"
      hasHeader={true}
      customHeader={false}
      hasFooter={true}
      externalScripts={[]}
    >
      <style>{"\n        @keyframes trackMove {\n            0% { left: 0%; opacity: 1; }\n            95% { left: calc(100% - 16px); opacity: 1; }\n            100% { left: 0%; opacity: 0; }\n        }\n        #trackTrain {\n            animation: trackMove 60s linear infinite;\n        }\n    "}</style>
    {"\n\n    "}
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    <main className="w-full relative z-10 px-4 md:px-8 py-8 grow flex items-center justify-center">
      {"\n        "}
      <div className="max-w-300 w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
        {"\n\n            "}
        {"\n            "}
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
              {"Lost your way?"}
            </span>
            {"\n                    "}
            <h1 className="text-3xl font-bold mt-2 mb-3 leading-snug">
              {"Let's get you back on track."}
            </h1>
            {"\n                    "}
            <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
              {"\n                        Enter your registered email and we'll send you a link to reset your password.\n                    "}
            </p>
            {"\n\n                    "}
            {"\n                    "}
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
        {"\n            "}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-10 bg-irctc-light/40">
          {"\n                "}
          <div className="w-full max-w-sm bg-white rounded-2xl relative">
            {"\n\n                    "}
            {"\n                    "}
            <div className="flex items-center justify-between pb-3">
              {"\n                        "}
              <div>
                {"\n                            "}
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                  {"Boarding pass"}
                </p>
                {"\n                            "}
                <p className="text-xl font-bold text-irctc-blue">
                  {"Reset Password"}
                </p>
                {"\n                        "}
              </div>
              {"\n                        "}
              <span className="text-[10px] font-bold text-irctc-orange border border-irctc-orange/40 bg-orange-50 px-2.5 py-1 rounded-full">
                {"RECOVERY"}
              </span>
              {"\n                    "}
            </div>
            {"\n\n                    "}
            {"\n                    "}
            <div className="relative my-2">
              {"\n                        "}
              <div className="border-t-2 border-dashed border-gray-200" />
              {"\n                        "}
              <span className="absolute -left-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-irctc-light" />
              {"\n                        "}
              <span className="absolute -right-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-irctc-light" />
              {"\n                    "}
            </div>
            {"\n\n                    "}
            <div className="pt-2">
              {"\n\n                        "}
              {"\n                        "}
              <form id="forgotForm">
                {"\n\n                            "}
                <p className="text-xs text-gray-500 mb-4">
                  {"Enter your registered email and we'll send you a reset link."}
                </p>
                {"\n\n                            "}
                <div className="mb-4">
                  {"\n                                "}
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                    {"Email"}
                  </label>
                  {"\n                                "}
                  <div className="relative">
                    {"\n                                    "}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      {"\n                                        "}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {"\n                                    "}
                    </span>
                    {"\n                                    "}
                    <input type="email" id="email" name="email" placeholder="Enter your registered email" className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                "}
                  </div>
                  {"\n                                "}
                  <p id="emailError" className="text-red-500 text-xs mt-1.5 hidden">
                    {"Please enter a valid email address."}
                  </p>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <button type="submit" className="w-full bg-irctc-orange hover:bg-[#e96b24] text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-sm">
                  {"\n                                Send Reset Link\n                            "}
                </button>
                {"\n\n                            "}
                <p className="text-center text-xs text-gray-500 mt-4">
                  {"\n                                Remembered your password?\n                                "}
                  <a href="login.html" className="text-irctc-blue font-bold hover:underline">
                    {"Back to Login"}
                  </a>
                  {"\n                            "}
                </p>
                {"\n\n                        "}
              </form>
              {"\n\n                        "}
              {"\n                        "}
              <div id="successMessage" className="hidden text-center py-4">
                {"\n                            "}
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3">
                  {"\n                                "}
                  <svg className="w-6 h-6 text-irctc-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {"\n                            "}
                </div>
                {"\n                            "}
                <h2 className="text-base font-bold text-irctc-blue mb-1">
                  {"Check your email"}
                </h2>
                {"\n                            "}
                <p className="text-gray-500 text-xs mb-5">
                  {"\n                                We've sent a password reset link to "}
                  <span id="sentEmail" className="font-medium text-gray-700" />
                  {".\n                                It may take a few minutes to arrive.\n                            "}
                </p>
                {"\n                            "}
                <a href="login.html" className="text-irctc-blue font-bold hover:underline text-xs">
                  {"Back to Login"}
                </a>
                {"\n                        "}
              </div>
              {"\n\n                    "}
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
    {"\n    "}
    {"\n\n    "}
    {"\n    "}
    {"\n\n"}
    </PageLayout>
  );
}
