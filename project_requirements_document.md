# Treez Mobile Customer Management - Project Requirements Document

## 1. Project Overview

Treez Mobile Customer Management is a mobile application built specifically for cannabis dispensary staff and budtenders. The app is designed to provide a fast, reliable, and compliant way to verify customer identity and eligibility at the point of entry. It leverages a user-friendly interface to scan government-issued IDs and passports, automatically performing real-time age verification. The purpose is to streamline the check-in process, reduce manual errors, and ensure that only eligible individuals proceed to the point-of-sale (POS), in line with state regulations.

The app is being built to extend the Treez single-tenant SaaS ecosystem, ensuring that dispensary staff use a familiar login system and interface. Its key objectives are to integrate with existing Treez authentication and customer APIs, offer robust ID scanning via Scandit, support manual entry when scanning fails, and provide necessary compliance alerts for banned or restricted customers. Success for this project will be measured by improved operational efficiency at check-in, reduced errors, and strict adherence to regulatory standards.

## 2. In-Scope vs. Out-of-Scope

### In-Scope

*   **Secure Login & Store Selection:** Budtenders log in using the existing Treez authentication system and select their appropriate store.
*   **ID Scanning & Age Verification:** Use the phone’s camera integrated with Scandit ID scanning technology to verify IDs (all US state driver’s licenses and passports from the US, Canada, Mexico) and perform real-time age checks.
*   **Manual Customer Search & Creation:** Provide an interface for searching existing customer profiles and a streamlined manual process for creating new customer profiles with auto-fill and validation (address and phone numbers) when the scan fails.
*   **API Integration & POS Sync:** Integration with the Treez Customer API to seamlessly sync customer data with the Treez POS.
*   **Flag Alerts & Compliance Logging:** Immediate red alerts for banned or restricted customers, including detailed logging (reason, timestamp, budtender ID) to support compliance and audits.
*   **Customer Profile Management:** Allow updating customer details, re-uploading IDs, and assigning customer groups.

### Out-of-Scope

*   **Offline Mode:** The app will not have an offline mode; it requires an active internet connection at all times.
*   **Additional Authentication Layers:** The app will rely solely on the existing Treez authentication system without extra security layers like multi-factor authentication.
*   **Non-Treez Integrations:** Any integrations or external systems outside of the Treez ecosystem are not included in this version.

## 3. User Flow

A budtender launches the app and is greeted by a secure login screen that uses the existing Treez authentication system. Once logged in, the user must select the relevant dispensary store, ensuring their session is correctly linked with the appropriate data and permissions. The initial dashboard then presents a clear and straightforward design, with a prominent option to scan customer IDs or manually look up customer profiles.

Upon scanning an ID using the device’s camera, the app immediately verifies the details; if the scan is successful and clear, customer information is auto-populated and synchronized with the Treez Customer API. In cases where the scanning yields ambiguous or low-quality results, the app prompts the budtender to switch to the manual customer creation process, complete with autofill capabilities for addresses and phone numbers. Additionally, if a customer is flagged as banned or restricted, a visible red alert will appear with the reason for the alert, requiring acknowledgment before proceeding, all while logging the incident for compliance.

## 4. Core Features (Bullet Points)

*   **Secure Authentication & Store Selection**

    *   Login via existing Treez authentication.
    *   Role and entity verification ensuring correct store selection.

*   **ID Scanning and Real-Time Age Verification**

    *   Leverage Scandit ID scanning technology using the phone’s camera.
    *   Recognize IDs from all US states and passports from the US, Canada, and Mexico.
    *   Auto-populate customer profile details upon successful scan.

*   **Manual Customer Search and Creation**

    *   Allow budtenders to manually search existing customer profiles.
    *   Provide a manual entry mode with auto-fill for address and phone number.
    *   Implement input validations using postal code APIs and standard format checks.

*   **Integration with Treez Customer API and POS**

    *   Sync customer profiles seamlessly with the Treez Customer API.
    *   Ensure real-time data updates between the mobile app and the Treez POS system.

*   **Banned/Restricted Customer Alerts**

    *   Display clear, red alerts for banned or restricted customers.
    *   Include detailed messages with reasons for restriction and next steps.
    *   Require acknowledgment from the budtender and log the interaction (date, time, budtender ID).

*   **Customer Profile Management**

    *   Enable updates to customer details and re-uploading of IDs.
    *   Provide functionality to add or assign customer groups for better organization.

## 5. Tech Stack & Tools

*   **Frontend (Mobile App):**

    *   React Native with TypeScript ensuring cross-platform support for iOS and Android.
    *   Design aligned with Treez branding (professional yet friendly, dark text on light backgrounds, green accents, high contrast, large CTAs, and clear icons).

*   **Backend:**

    *   Built on the existing Treez Customer External API for seamless integration with the Treez POS system.

*   **ID Scanning & OCR:**

    *   Utilize Scandit for reliable ID scanning across various states and countries.

*   **Other Tools & Plugins:**

    *   Lovable.dev for generating and expediting front-end and full-stack components.
    *   Integration with postal code APIs for address validation.

## 6. Non-Functional Requirements

*   **Performance:**

    *   Must ensure quick response times, ideally with less than a 2-second delay between actions (e.g., ID scan to auto-population of data).
    *   The app should perform smoothly under regular mobile network conditions.

*   **Security:**

    *   Leverage role-based access control provided by the Treez authentication system.
    *   Encrypt data in transit using standard mobile app protocols.

*   **Usability & Accessibility:**

    *   Interface design should be simple and quick to navigate for budtenders.
    *   High contrast color schemes and large tap targets ensure accessibility.
    *   Clear visual feedback (e.g., noticeable red alerts) is essential for critical actions.

*   **Reliability:**

    *   The app consistently requires an active internet connection; any connectivity issues prompt a clear message for resolution.
    *   Error messages must be user-friendly, guiding the budtender to manual entry or connectivity troubleshooting.

## 7. Constraints & Assumptions

*   **Internet Connectivity:**

    *   The app is designed to work only with active internet connectivity. No offline mode is provided.

*   **Authentication Dependency:**

    *   The application assumes the existing Treez authentication system is robust and available without the need for additional MFA layers.

*   **SDK Reliability:**

    *   All ID scanning features depend on the continuous availability and performance of Scandit.

*   **Existing API Integration:**

    *   The Treez Customer API is assumed to be reliable and able to handle real-time interactions during peak load times.

*   **User Environment:**

    *   The application is built for cannabis dispensary environments, expecting users to be familiar with quick customer check-in workflows and digital interfaces.

## 8. Known Issues & Potential Pitfalls

*   **Connectivity Issues:**

    *   Since the app requires an active internet connection, any downtime or slow connectivity can halt operations. In such cases, a clearly displayed graphic instructs users to refresh their connection or contact support.

*   **Ambiguous ID Scan Results:**

    *   Low-quality or ambiguous ID scans may force repetitive manual entries. To mitigate this, the app prompts users immediately to switch to manual entry with clear guidance and auto-fill options.

*   **API Downtime:**

    *   If the Treez Customer API is unavailable, the app becomes unusable. The built-in error-handling mechanism will rely on a prompt advising users to re-check their internet connection or contact support.

*   **Usage Logging & Compliance:**

    *   Ensuring all banned/restricted customer alerts are logged correctly is critical. Any bugs in this module could lead to non-compliance. Thorough testing and logging verification are required.

*   **SDK Integration Risks:**

    *   Scandit scanning must handle the wide variety of ID formats and conditions. Regular testing and the ability to update/configure the scanning module will help mitigate any scanning inaccuracies or failures.

This PRD should serve as the main reference point for generating subsequent technical documents, ensuring that every aspect of the Treez Mobile Customer Management app is clearly defined and understood.
