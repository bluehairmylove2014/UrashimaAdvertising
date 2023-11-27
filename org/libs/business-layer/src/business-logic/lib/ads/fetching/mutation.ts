// import {
//   AuthService,
//   authenticationResponseType,
//   loginParamsType,
// } from '@business-layer/services';
// import { useMutation } from '@tanstack/react-query';
// import { mutationConfig } from '@business-layer/business-logic/configs';
// import {
//   getFBAccessTokenParamsType,
// } from '@business-layer/services/lib/socialService/type';

// // Initialize the AuthService
// const authService = new AuthService();

// /**
//  * Use this mutation to login
//  */
// export const useLoginMutation = () => {
//   return useMutation<
//     authenticationResponseType,
//     Error,
//     loginParamsType,
//     unknown
//   >({
//     mutationFn: authService.login,
//   });
// };
