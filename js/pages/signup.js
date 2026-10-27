import React, { useLayoutEffect, useState } from "react";
import PageLayout from "../components/PageLayout.js";
import { runLegacyAction, runPageScripts } from "../legacy.js";

export default function SignupPage() {
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [visiblePasswords, setVisiblePasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  useLayoutEffect(() => runPageScripts("signup"), []);

  function updateField(event) {
    const { name, value } = event.target;
    setFormValues((values) => ({ ...values, [name]: value }));
  }

  return (
    <PageLayout
      page="signup"
      bodyClass="text-gray-800 font-sans min-h-screen flex flex-col bg-gray-50 m-0"
      headerClass="w-full relative z-20 px-4 md:px-8 pt-4 md:pt-6 shrink-0"
      footerClass="text-white pt-10 pb-6 border-t-4 border-irctc-orange relative z-30 w-full shadow-xl shrink-0 mt-auto"
      hasHeader={true}
      customHeader={false}
      hasFooter={true}
      externalScripts={[]}
    >
      <style>{"\n        @keyframes trackMove {\n            0% { left: 0%; opacity: 1; }\n            95% { left: calc(100% - 16px); opacity: 1; }\n            100% { left: 0%; opacity: 0; }\n        }\n        #trackTrain {\n            animation: trackMove 60s linear infinite;\n        }\n    "}</style>
    {"\n\n    "}
    {"\n\n    "}
    <main className="w-full relative z-10 px-4 md:px-8 py-6 grow flex items-center justify-center">
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
              {"New here?"}
            </span>
            {"\n                    "}
            <h1 className="text-3xl font-bold mt-2 mb-3 leading-snug">
              {"Join and start booking in minutes."}
            </h1>
            {"\n                    "}
            <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm">
              {"\n                        Create your account to book tickets, track PNR status, and manage your journeys from one dashboard.\n                    "}
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
            <div className="flex items-center justify-between pb-3">
              {"\n                        "}
              <div>
                {"\n                            "}
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                  {"Boarding pass"}
                </p>
                {"\n                            "}
                <p className="text-xl font-bold text-irctc-blue">
                  {"Register"}
                </p>
                {"\n                        "}
              </div>
              {"\n                        "}
              <span className="text-[10px] font-bold text-irctc-orange border border-irctc-orange/40 bg-orange-50 px-2.5 py-1 rounded-full">
                {"NEW USER"}
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
            <div className="pt-2">
              {"\n                        "}
              <p className="text-xs text-gray-500 mb-4">
                {"Fill in your details to create your account."}
              </p>
              {"\n\n                        "}
              <form id="signupForm" className="space-y-3">
                {"\n\n                            "}
                <div>
                  {"\n                                "}
                  <label htmlFor="fullname" className="block text-xs font-semibold text-gray-700 mb-1">
                    {"Full Name"}
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
                    <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" value={formValues.fullname} onChange={updateField} className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                "}
                  </div>
                  {"\n                                "}
                  <p id="fullnameError" className="text-red-500 text-xs mt-1 hidden">
                    {"Please enter your full name."}
                  </p>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <div>
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
                    <input type="email" id="email" name="email" placeholder="Enter your email" value={formValues.email} onChange={updateField} className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                "}
                  </div>
                  {"\n                                "}
                  <p id="emailError" className="text-red-500 text-xs mt-1 hidden">
                    {"Please enter a valid email address."}
                  </p>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <div>
                  {"\n                                "}
                  <label htmlFor="mobile" className="block text-xs font-semibold text-gray-700 mb-1">
                    {"Mobile Number"}
                  </label>
                  {"\n                                "}
                  <div className="relative">
                    {"\n                                    "}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      {"\n                                        "}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 011 .76l1.12 4.5a1 1 0 01-.29 1L8.4 10.6a11 11 0 005 5l1.35-1.7a1 1 0 011-.29l4.5 1.12a1 1 0 01.76 1V19a2 2 0 01-2 2h-1C9.4 21 3 14.6 3 6V5z" />
                      </svg>
                      {"\n                                    "}
                    </span>
                    {"\n                                    "}
                    <input type="tel" id="mobile" name="mobile" placeholder="10-digit mobile number" value={formValues.mobile} onChange={updateField} className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                "}
                  </div>
                  {"\n                                "}
                  <p id="mobileError" className="text-red-500 text-xs mt-1 hidden">
                    {"Please enter a valid 10-digit mobile number."}
                  </p>
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
                    <input type={visiblePasswords.password ? "text" : "password"} id="password" name="password" placeholder="At least 6 characters" value={formValues.password} onChange={updateField} className="w-full border border-gray-300 rounded-lg pl-10 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                    "}
                    <button type="button" id="togglePassword" aria-label={visiblePasswords.password ? "Hide password" : "Show password"} onClick={() => setVisiblePasswords((values) => ({ ...values, password: !values.password }))} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-irctc-blue">
                      {"\n                                        "}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {"\n                                    "}
                    </button>
                    {"\n                                "}
                  </div>
                  {"\n                                "}
                  <p id="passwordError" className="text-red-500 text-xs mt-1 hidden">
                    {"Password must be at least 6 characters."}
                  </p>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <div>
                  {"\n                                "}
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700 mb-1">
                    {"Confirm Password"}
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
                    <input type={visiblePasswords.confirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" value={formValues.confirmPassword} onChange={updateField} className="w-full border border-gray-300 rounded-lg pl-10 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-irctc-blue" />
                    {"\n                                    "}
                    <button type="button" id="toggleConfirmPassword" aria-label={visiblePasswords.confirmPassword ? "Hide password" : "Show password"} onClick={() => setVisiblePasswords((values) => ({ ...values, confirmPassword: !values.confirmPassword }))} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-irctc-blue">
                      {"\n                                        "}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {"\n                                    "}
                    </button>
                    {"\n                                "}
                  </div>
                  {"\n                                "}
                  <p id="confirmPasswordError" className="text-red-500 text-xs mt-1 hidden">
                    {"Passwords do not match."}
                  </p>
                  {"\n                            "}
                </div>
                {"\n\n                            "}
                <button type="submit" className="w-full bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-sm mt-2">
                  {"\n                                Create Account\n                            "}
                </button>
                {"\n\n                        "}
              </form>
              {"\n\n                        "}
              <p className="text-center text-xs text-gray-500 mt-4">
                {"\n                            Already have an account?\n                            "}
                <a href="login.html" className="text-irctc-blue font-bold hover:underline">
                  {"Sign in"}
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
    {"\n\n    "}
    {"\n"}
    </PageLayout>
  );
}
