# Customer Portal Prompts

- wszędzie wykorzystywane są podobne prompty, opierające się o cursor rules
- **wykorzystywane**: cursor, claude-4-sonnet **MAX**

## Table of Contents

- [Customer Portal Prompts](#customer-portal-prompts)
  - [Table of Contents](#table-of-contents)
  - [_All Requests_ Feature Slice](#all-requests-feature-slice)
  - [_Billing_ Feature Slice](#billing-feature-slice)
  - [_Settings_ Feature Slice](#settings-feature-slice)
  - [Auth Feature Slices: _Sign-in_, _Register_, _Forgot-password_](#auth-feature-slices-sign-in-register-forgot-password)
  - [Breaking Queries](#breaking-queries)
  - [Refactor cross-feature slice](#refactor-cross-feature-slice)

## _All Requests_ Feature Slice

- wrzucam wszystkie pliki z istniejącej implementacji (quasi-Layered-Architecture)
- dodaję komponent z pages (bo nuxt to SSR - więc plik z pages pełni podwójną rolę: komponentu i route'a)
- aby zredukować ryzyko, że LLM "głupio" rozbije główny komponent, sam tworzę puste pliki wskazując nazwami, co powinny zawierać. One też są dorzucone do kontekstu prompta
- Zataje pozostałe pliki, czyli model, połączenie z API, mocki itp.
- Do kontekstu dorzucam również regułę (.mdc)

> `@AllRequestsPage.vue` `@Filters.vue` `@TransportationRequests.vue` `@WarehousingRequests.vue` `@index.vue` `@requests.mocks.ts` `@index.ts` `@requests.api.ts` `@vertical-slices-architecture.mdc ` Please refactor the @AllRequests subpage. Now, there might need to be some changes. So @AllRequests subpage should display two data tables. The first data table would display the transportation requests, and the other data table would display the warehousing requests. So, transportation would define... You can check the other files for what a transportation is, but basically, you know, moving cargo of a certain type from place A to place B on a certain date, etc. But they are just requests, so it didn't start it. And similarly, warehouse requests are only requests that are not yet, you know, not yet proceeded. They didn't start yet. So, yeah, follow the vertical slices architecture.

## _Billing_ Feature Slice

Na wejściu nie miał żadnych plików (w docelowym folderze).

Jedynie do czego się nie zastosował to stworzył barrel file `index.ts`, mimo że powinno go nie być. I ma to explicite w regule `.cursor/rules/application-structure-and-conventions.mdc`. Natomiast po włączeniu tej reguły do kontekstu prompta (manualnie, w następnym kroku) poprawił to.

> `@billing.vue` `@/billing` `@billing.api.ts` `@vertical-slices-architecture.mdc` `@BillingPage.vue` Please refactor billing_page to vertical slice architecture. If there are multiple elements of the billing page, please create distinct components depending on the structure of the content. Take into account what the user can see and not just each element in the HTML target structure. Like you know, higher level pieces of the page.

```
billing-api.ts       
billing.mocks.ts     
billing.model.ts     
BillingPage.vue      
BillingStats.vue
CreditUsageChart.vue
index.ts
InvoicesTable.vue
PaymentMethods.vue
```

## _Settings_ Feature Slice

- na wejściu miał raptem jeden plik (z `pages`)
- wydzielił interfejsy, api, rozbił na podkomponenty (to jedyna rzecz jaką dostał ode mnie wprost - tego nie ma w rules/mdc, bo każda zakładka jest inna)

> `@settings.vue` `@SettingsPage.vue` Please refactor the settings page according to vertical slices architecture. `@vertical-slices-architecture.mdc` Split the settings page into multiple separate components where each is a separate tab in the settings

```
CompanyInformationTab.vue
ContactInformationTab.vue
NotificationPreferencesTab.vue
SecuritySettingsTab.vue
settings-api.ts
settings.mocks.ts
settings.model.ts
SettingsPage.vue
```

## Auth Feature Slices: _Sign-in_, _Register_, _Forgot-password_ 

A poniższy prompt piecze 3 pieczenie na jednym ogniu. Mianowicie, rozbija niedobitki o nazwie user (model, API, mocks) i dostaje prikaz, aby stworzyć trzy feature slices: _Sign-in_, _Register_ oraz _Forgot-password_ (ten to trzeba w ogóle stworzyć).

> `@register.vue` `@RegisterAccount.vue` The register component in pages should be refactored to register account view, its own vertical slice.
>
> `@SignIn.vue` `@login.vue` The login should be refactored into SignIn view, its own vertical slice.
>
> `@ForgotPassword.vue` The ForgotPassword page should be created as it doesn't exist yet. Also, it will have its own slice.
>
> You need to make sure that all components are interactive between each other, like they link to each other.
>
> And you need to make sure that what you create will conform to the vertical slices architecture requirements. 
`@vertical-slices-architecture.mdc` 
>
> `@user.api.ts` `@user.mocks.ts` `@index.ts` Also, please verify whether some of the user files such as user.api, user.mocks, user.model, maybe they could be removed because they belong to authorization features.
> 
> Finally, verify whether the user-related files can be dropped entirely unless they are being used somewhere. In that case, mention that explicitly at the end of your report.
`@application-structure-and-conventions.mdc` 

I jeszcze jeden mały follow-up, żeby potraktował każdy podfolder jako osobny Feature Slice, żeby nie tworzył im wspólnego modelu, wspólnego API, wspólnych mocków:

> `@ForgotPassword.vue` `@RegisterAccount.vue` `@SignIn.vue` `@auth-api.ts` `@auth.mocks.ts` `@auth.model.ts` You've done a good job, but we need to go one step further. You need to treat ForgotPassword as a separate slice, Register as a separate slice, and Sign as a separate slice. So, each directory has a separate slice, which contains its own API, elements, its own mocks, and its own model. So, if something needs to be used in many places, just copy the things. But if something is not used within the slice, it should be removed. That means that if Auth API includes five functions, each of them could fit into some of the slices, but not all of them.
>
> `@/forgot-password` `@/register` `@/signin` So remember, `auth` directory is not a slice, but `auth/forgot-password` is a slice.

I ogarnął wyśmienicie 😎

```
features/
    auth/
        forgot-password/
            forgot-password-api.ts
            forgot-password.model.ts
            ForgotPassword.vue

        register/
            register-api.ts
            register.mocks.ts
            register.model.ts
            RegisterAccount.vue

        signin/
            signin-api.ts
            signin.mocks.ts
            signin.model.ts
            SignIn.vue
```

## Breaking Queries

Podczas separacji vertical slice'ów LLM pominął queries (tanstack/vue-query). Plik `composables/useVueQuery.ts` trzymał masę totalnie niepowiązalnych ze sobą query w jednym pliku. Poniższy prompt nakazał skutecznie przyporządkowanie ich odpowiednim plikom z masą searchowania i grepowania 😎

> `@useVueQuery.ts` This composable file includes many totally unrelated functions and it should be split apart. So there are functions such as useTransportationRequestDetails which might not have been extracted into its own vertical slice, but there are functions related to billing, to tracking, to settings, to team operations etc. and they do have their own feature slices. So I would like you to go through all of the functions within this specific file, do searching and grabbing in order to find where in which feature slice do these functions belong and move them there. Just to make it clear, the tanstack queries belong to the API files in each slice.

## Refactor cross-feature slice

> We will need to change the ServiceRequests page component.
> Right now it displays generally the filters, then pending transportation requests and then pending warehousing requests.
>
> So after the change, first it would be the tabs for the transportation requests, remove the pending word, and then warehousing requests. Now inside each of these tabs, we would have particular filters and the data tables. So for transportation request tab that there would be transportation requests filters and transportation requests data table. And for the warehousing requests tab there would be warehousing requests filters and warehousing requests data table.
>
> We will need to break the existing implementation of the service requests/requests listing feature slice. There we have a common filter, which doesn't make sense, because we can have totally different things like statuses, route cargo, you know, like route cargo exists only for transportation and storage type exists only for warehousing, so you know, it doesn't make sense on the crossing. So, also there is the ServiceRequest transportation data table and ServiceRequest warehousing data table, so these should, you know, be in the distinct tabs. So, I would ask you to update it to the new structure. So the warehousing requests would be one new feature slice and the transportation requests would be another feature slice. And they would both be used from within a cab component.
>
> So bear in mind that you are actually creating three feature slices. The main one would be the service requests. The second one would be the transportation requests. And the third one would be warehousing requests. So the main one with the tabs would include nested feature slices within.
>
> Make sure that you stick to vertical slices architecture requirements.

Też dał radę 😎
