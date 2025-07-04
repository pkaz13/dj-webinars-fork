(najpierw była analiza domeny w wątku w perplexity), potem prompt:

```
Now, I need you to provide a detailed specification for a customer portal for such system. So there would be a public section where unauthorized and unauthenticated users can access. 

The default page would be a typical marketing style, you know, sales page, including some success stories, provide additional subpages for some kind of, you know, success case studies, maybe three of them. There should be also a ability for unauthenticated users to request a quote of our services, and there would be two main services, the transportation one and warehousing one. Depending on the type, the user would provide generic information about their company and contact, but depending on the type of service, they would provide additional information for transport like from where to where, when, etc. and for warehousing, basically which warehouse and in which dates. They just submit the order and then it's on our site to process, to negotiate and so on and so forth. However, the main thing is that the user can log in into their account if they have it, obviously, so there would be a nice, you know, login page with all the user creation, etc., etc. But there would be also a lots of details within the application and that would be specifically the following tabs. First, a dashboard with the most important things for the customer again. So probably the requests of the customer, like what is their status, what's going on with them, for both the transportation and warehousing, there would be some probably, you know, statistics or metrics, some quick actions. So there would be all requests, another page where we could see, yeah, all the requests to be filtered. There would be a specific tab subpage for transportation requests along with a subpage for details, another one for warehousing requests along with details. Also for transportation, it would be possible to track them. So yet another subpage to track, yeah, where is the cargo being transported? So the new shipment tab would include a simple search for, I know by some kind of code ID or a tracking number, shipment number, something like that. And it would display a map of the routes of the route of this cargo transport, where the truck is, etc. And after the truck is submitted, then open street map gets displayed with a graph of, yeah, like where the truck was, where the truck currently is displaying the map of the planned points. So yeah, what's important is that for each item in the previous tab that I mentioned transportation, we could basically easily navigate to tracking this exact thing, you know, so that less clicks need to be processed. You just jump straight into transportation of a, yeah, a given open transport, yeah, as simple as you can think of it. Another tab like other tabs would be kind of more administrative alike. So the team for what the accounts are from the customer's site, the billing information like, you know, everything about payment, payments. And finally some reports, yeah, some statistics, maybe some additional information about I know performance of our services, whatever. And finally the settings. So yeah, that's what it should be there. What's important for me is that I want you to provide a lot of details for each subpage and each site and each navigation so that I could easily iterate in the next steps, what should be the content. So I would like this to be in markdown format to be separated into chapters so that another LLM which is going to use it in a prompt would be able to scaffold as much as possible and to get the context of what would be the next steps.
```

i to co wypluło perplexity (z drobnymi poprawkami) powędrowało do bolta:

```
# Customer Portal Specification for FTL Transportation and Warehousing System

## Executive Summary

This specification outlines a comprehensive customer portal for a B2B transportation and warehousing company that provides Full Truckload (FTL) services and warehousing capabilities. The portal consists of both public sections for marketing and quote requests, and a secure authenticated area for existing customers to manage their shipments, track cargo, and access detailed reporting and analytics.

## Chapter 1: Public Section (Unauthenticated)

### 1.1 Homepage (Marketing Landing Page)

**Purpose**: Convert visitors into customers through compelling marketing content and clear value propositions[1].

**Key Elements**:
- Hero section with primary value proposition for FTL transportation and warehousing services
- Service overview cards highlighting transportation and warehousing capabilities
- Trust indicators (certifications, safety records, years in business)
- Customer testimonials and success story highlights
- Clear call-to-action buttons for quote requests and account creation
- Navigation menu linking to subpages and sign in

**Content Sections**:
- About Us section emphasizing B2B focus and FTL expertise
- Service capabilities overview (specialized trucks, warehouse facilities)
- Geographic coverage map showing service areas
- Key differentiators (reliability, tracking capabilities, customer service)
- Contact information and support channels

### 1.2 Success Stories/Case Studies Pages

**Purpose**: Build credibility and demonstrate value through real customer examples[2].

**Structure**: Three dedicated subpages showcasing different industry verticals or service types:

**Case Study 1: Manufacturing Supply Chain**
- Challenge: Large manufacturer needing reliable FTL transport for raw materials
- Solution: Dedicated transportation routes with temperature-controlled cargo
- Results: Reduced transit time by 15%, improved inventory management
- Key metrics: On-time delivery rate, cost savings, customer satisfaction

**Case Study 2: Distribution Center Operations**
- Challenge: E-commerce company requiring integrated warehousing and distribution
- Solution: Cross-docking operations with real-time inventory tracking
- Results: 40% reduction in order processing time, improved customer satisfaction
- Key metrics: Order accuracy, fulfillment speed, warehouse utilization

**Case Study 3: Project Cargo Transportation**
- Challenge: Construction company needing oversized cargo transport
- Solution: Specialized heavy-lift equipment and route planning
- Results: Successful delivery of critical project components on schedule
- Key metrics: Safety record, delivery precision, project completion time

### 1.3 Quote Request System

**Purpose**: Capture leads and provide initial service estimates[3][4][5].

**Transportation Quote Request Form**:
- Company Information:
  - Company name and contact details
  - Industry type
  - Primary contact information
  - Billing address
- Shipment Details:
  - Origin address (pickup location)
  - Destination address (delivery location)
  - Preferred pickup date and time window
  - Required delivery date and time window
  - Cargo description and commodity type
  - Weight and dimensions
  - Special handling requirements (hazmat, temperature control, etc.)
  - Loading/unloading requirements
- Service Requirements:
  - FTL, PTL, or specialized equipment needs
  - Trailer type preferences (dry van, reefer, flatbed, etc.)
  - Accessorial services needed
  - Insurance requirements

**Warehousing Quote Request Form**:
- Company Information: (Same as transportation)
- Warehousing Requirements:
  - Preferred warehouse location
  - Storage start date
  - Expected storage duration
  - Cargo type and special storage requirements
  - Quantity and space requirements
  - Handling services needed (receiving, picking, packing)
  - Temperature control requirements
  - Security requirements
- Additional Services:
  - Cross-docking needs
  - Inventory management requirements
  - Distribution services
  - Value-added services (labeling, kitting, etc.)

**Form Processing**:
- Automated acknowledgment email to customer
- Internal notification to sales team
- Quote request tracking number generation
- Follow-up workflow initiation

## Chapter 2: Authentication System

### 2.1 User Registration Process

**Purpose**: Streamline onboarding for new B2B customers[6].

**Registration Flow**:
- Company information collection (name, industry, size, headquarters)
- Primary contact details (name, title, email, phone)
- Billing and shipping addresses
- Business verification (tax ID, business registration)
- Initial service preferences and requirements
- Account verification via email confirmation
- Admin approval process for account activation

**Account Types**:
- Primary Administrator (full access)
- Billing Contact (billing and payment access)
- Operations Manager (shipment and warehouse management)
- Read-Only User (tracking and reporting only)

### 2.2 Login Interface

**Purpose**: Secure access to customer portal with user-friendly experience[7].

**Login Features**:
- Username/email and password authentication
- "Remember me" functionality
- Password reset capability
- Multi-factor authentication option
- Session timeout management
- Account lockout protection
- Mobile-responsive design

**Security Features**:
- SSL encryption
- Failed login attempt monitoring
- IP-based access controls
- Session management
- Audit logging

## Chapter 3: Authenticated Dashboard

### 3.1 Main Dashboard Overview

**Purpose**: Provide at-a-glance view of critical information and quick access to key functions[8][9].

**Dashboard Widgets**:
- **Active Shipments Summary**: Number of shipments in transit, pending pickup, delivered today
- **Warehouse Inventory Overview**: Current storage utilization, items in/out today, pending releases
- **Recent Activity Feed**: Latest shipment updates, deliveries, and system notifications
- **Performance Metrics**: On-time delivery rate, average transit time, cost per shipment
- **Quick Actions Panel**: New shipment request, warehouse release, track shipment, view invoices
- **Alerts and Notifications**: Delivery delays, inventory low stock, billing reminders

**Key Performance Indicators**:
- Total shipments this month vs. last month
- Average delivery time
- Cost per shipment trend
- Warehouse utilization percentage
- Customer satisfaction score

### 3.2 Navigation Structure

**Primary Navigation Menu**:
- Dashboard (home)
- All Requests
- Transportation
- Warehousing
- Tracking
- Team & Accounts
- Billing
- Reports
- Settings

**Secondary Navigation** (contextual based on section):
- Breadcrumb navigation
- Section-specific filters and sorting
- Quick access shortcuts
- Search functionality

## Chapter 4: All Requests Section

### 4.1 Unified Request View

**Purpose**: Centralized view of all customer requests across services[10][11].

**Request List Features**:
- **Unified Table View**: All transportation and warehousing requests in one sortable table
- **Status Indicators**: Visual status badges (pending, confirmed, in progress, completed, cancelled)
- **Request Types**: Clear identification of transportation vs. warehousing requests
- **Date Ranges**: Creation date, service date, completion date
- **Quick Actions**: View details, duplicate request, cancel, track (for transportation)

**Filtering Options**:
- Request type (transportation, warehousing, all)
- Status (pending, active, completed, cancelled)
- Date range (today, this week, this month, last 30 days, custom range)
- Service type (FTL, specialized transport, warehouse storage)
- Origin/destination (for transportation)
- Warehouse location (for warehousing)

**Sorting Options**:
- Creation date (newest/oldest first)
- Service date (upcoming/past)
- Status (active first, completed last)
- Request ID (ascending/descending)

### 4.2 Request Details Modal/Page

**Common Request Information**:
- Request ID and creation timestamp
- Service type and description
- Current status and status history
- Assigned contact/account manager
- Estimated and actual costs
- Special instructions and notes
- Related documents and attachments

## Chapter 5: Transportation Section

### 5.1 Transportation Requests Dashboard

**Purpose**: Dedicated view for managing transportation-specific requests[12][11].

**Transportation-Specific Features**:
- **Shipment Status Pipeline**: Visual representation of shipment stages (requested, scheduled, picked up, in transit, delivered)
- **Route Information**: Origin, destination, via points, estimated distance
- **Equipment Details**: Truck type, trailer specifications, driver information
- **Cargo Information**: Weight, dimensions, commodity type, special handling
- **Timeline View**: Pickup appointment, estimated delivery, actual delivery

**Quick Actions**:
- Request new shipment
- Modify existing shipment (if allowed)
- Download Bill of Lading
- View Proof of Delivery
- Track shipment (direct link to tracking)
- Duplicate shipment request

### 5.2 Transportation Request Details Page

**Detailed Information Sections**:

**Shipment Overview**:
- Shipment ID and reference numbers
- Service type (FTL, specialized)
- Current status and progress indicators
- Priority level and service level agreements

**Route Details**:
- Origin facility information and contact
- Destination facility information and contact
- Planned route and mileage
- Estimated transit time
- Special route requirements

**Cargo Information**:
- Commodity description and classification
- Weight and dimensional details
- Packaging information
- Special handling requirements
- Insurance coverage details

**Equipment Assignment**:
- Truck and trailer information
- Driver contact information
- Equipment specifications
- Special equipment features

**Timeline and Milestones**:
- Request creation and approval
- Pickup scheduling and confirmation
- Pickup completion
- Transit milestones
- Delivery scheduling and completion

**Documents and Communications**:
- Bill of Lading
- Proof of Delivery
- Special instructions
- Communication log
- Photo documentation

### 5.3 New Transportation Request Form

**Streamlined Request Creation**:
- **Template Selection**: Choose from frequently used routes or create new
- **Route Planning**: Interactive map for route visualization
- **Cargo Details**: Comprehensive cargo information capture
- **Equipment Selection**: Truck type and special equipment requirements
- **Service Level Selection**: Standard, expedited, or specialized service
- **Additional Services**: Accessorial services and special handling
- **Cost Estimation**: Real-time rate calculation based on selections

## Chapter 6: Warehousing Section

### 6.1 Warehousing Requests Dashboard

**Purpose**: Dedicated view for warehouse operations and storage management[13][14].

**Warehousing-Specific Features**:
- **Storage Status Overview**: Available capacity, reserved space, utilized space
- **Inventory Summary**: Items in storage, recent receipts, recent releases
- **Warehouse Locations**: Multiple warehouse facilities and their status
- **Storage Duration**: Average storage time, long-term storage alerts
- **Activity Timeline**: Receipts, releases, inventory adjustments

**Quick Actions**:
- Request storage space
- Release cargo
- Schedule receiving appointment
- View inventory report
- Request warehouse services
- Download storage documents

### 6.2 Warehousing Request Details Page

**Detailed Information Sections**:

**Storage Overview**:
- Storage request ID and reference
- Warehouse location and facility details
- Storage type (ambient, refrigerated, hazmat)
- Space allocation and utilization
- Storage duration and billing cycle

**Inventory Details**:
- Item descriptions and quantities
- Lot numbers and tracking information
- Condition and quality status
- Location within warehouse
- Inventory movement history

**Services and Handling**:
- Receiving services performed
- Storage conditions maintained
- Handling services provided
- Quality control inspections
- Value-added services performed

**Financial Information**:
- Storage rates and billing structure
- Additional service charges
- Payment terms and status
- Cost comparisons and analytics

### 6.3 Cargo Release Management

**Self-Service Release Process**:
- **Release Request Form**: Select items, quantities, and release instructions
- **Appointment Scheduling**: Choose pickup time slots
- **Documentation Generation**: Automatic release order creation
- **Approval Workflow**: Internal approval process for complex releases
- **Notification System**: Automated notifications to all parties

## Chapter 7: Tracking Section

### 7.1 Shipment Tracking Interface

**Purpose**: Real-time visibility into shipment location and status[12][15].

**Tracking Features**:
- **Search Functionality**: Track by shipment ID, BOL number, PO number, or container number
- **Multi-Shipment Tracking**: Track multiple shipments simultaneously
- **Map Integration**: OpenStreetMap integration for visual tracking
- **Status Updates**: Real-time status updates and milestone notifications
- **ETA Calculations**: Dynamic estimated arrival times based on current conditions

### 7.2 Interactive Tracking Map

**Map Features**:
- **Current Location**: Real-time GPS position of transportation vehicle
- **Planned Route**: Visualized route with waypoints and stops
- **Historical Path**: Traveled route with timestamps
- **Delivery Points**: Origin and destination markers with facility information
- **Traffic Conditions**: Real-time traffic overlays when available
- **Weather Conditions**: Weather information along the route

**Map Controls**:
- Zoom and pan functionality
- Satellite vs. street view options
- Layer toggles (traffic, weather, facilities)
- Full-screen mode
- Mobile-responsive design

### 7.3 Shipment Status Timeline

**Timeline Features**:
- **Milestone Tracking**: Key events with timestamps
- **Status Updates**: Detailed status descriptions and location information
- **Photo Documentation**: Proof of delivery photos and condition reports
- **Exception Handling**: Delay notifications and resolution updates
- **Communication Log**: Driver and dispatcher communications

**One-Click Navigation**:
- Direct links from transportation request list to tracking
- Embedded tracking widgets in dashboard
- Quick access tracking shortcuts
- Mobile-optimized tracking interface

## Chapter 8: Team & Accounts Section

### 8.1 User Management

**Purpose**: Manage team members and their access permissions[6].

**User Administration Features**:
- **User List**: All team members with roles and status
- **Role Assignment**: Predefined roles with specific permissions
- **Access Control**: Granular permissions for different system areas
- **User Invitation**: Invite new team members with role assignment
- **Account Status**: Active, inactive, pending approval statuses

**User Roles**:
- **Account Administrator**: Full system access and user management
- **Transportation Manager**: Transportation requests and tracking
- **Warehouse Manager**: Warehouse operations and inventory
- **Billing Manager**: Financial information and payment processing
- **Viewer**: Read-only access to information and reports

### 8.2 Company Profile Management

**Company Information**:
- Company details and contact information
- Billing and shipping addresses
- Business verification documents
- Service preferences and requirements
- Communication preferences

**Account Settings**:
- Default shipping addresses
- Preferred equipment types
- Standard cargo classifications
- Billing preferences
- Notification settings

## Chapter 9: Billing Section

### 9.1 Invoice Management

**Purpose**: Comprehensive billing and payment management[16][17].

**Invoice Features**:
- **Invoice List**: All invoices with status, dates, and amounts
- **Invoice Details**: Detailed breakdown of charges and services
- **Payment Status**: Paid, pending, overdue, disputed statuses
- **Payment History**: Complete payment transaction history
- **Dispute Management**: Raise disputes and track resolution

**Billing Information**:
- Service charges breakdown
- Accessorial charges
- Fuel surcharges
- Taxes and fees
- Payment terms and due dates

### 9.2 Payment Processing

**Payment Options**:
- Online payment via credit card or ACH
- Automatic payment setup
- Payment scheduling
- Multi-invoice payment processing
- Payment confirmation and receipts

**Financial Reports**:
- Monthly billing summaries
- Cost analysis by service type
- Payment history reports
- Budget vs. actual spending
- Cost per shipment analytics

## Chapter 10: Reports Section

### 10.1 Standard Reports

**Purpose**: Provide comprehensive analytics and performance insights[18][19].

**Transportation Reports**:
- **Shipment Performance**: On-time delivery rates, average transit times
- **Cost Analysis**: Cost per shipment, fuel costs, accessorial charges
- **Route Analysis**: Most used routes, cost-effective lanes
- **Carrier Performance**: If using subcontractors, performance metrics
- **Exception Reports**: Delays, damages, service failures

**Warehousing Reports**:
- **Storage Utilization**: Warehouse space usage over time
- **Inventory Turnover**: Inventory movement and aging reports
- **Receiving/Shipping Activity**: Volume and timing analysis
- **Cost Per Unit**: Storage and handling costs per item
- **Service Level Reports**: Accuracy and timeliness metrics

### 10.2 Custom Report Builder

**Report Customization**:
- **Drag-and-Drop Interface**: Easy report building without technical knowledge
- **Data Filters**: Date ranges, service types, locations, customers
- **Visualization Options**: Charts, graphs, tables, and dashboards
- **Export Formats**: PDF, Excel, CSV export options
- **Scheduled Reports**: Automated report generation and delivery

**Performance Metrics**:
- **Key Performance Indicators**: Customizable KPI dashboards
- **Trend Analysis**: Historical performance trends and forecasting
- **Benchmarking**: Performance comparison against industry standards
- **Cost Optimization**: Identify cost-saving opportunities
- **Service Improvement**: Areas for operational enhancement

## Chapter 11: Settings Section

### 11.1 Account Configuration

**Purpose**: Customize portal experience and preferences[20].

**General Settings**:
- **Profile Information**: Company details and contact information
- **Communication Preferences**: Email notifications, SMS alerts, frequency
- **Time Zone Settings**: Local time zone for scheduling and reporting
- **Language Preferences**: Interface language selection
- **Default Views**: Preferred dashboard layouts and default page settings

**Service Preferences**:
- **Default Shipping Addresses**: Frequently used pickup and delivery locations
- **Equipment Preferences**: Preferred truck types and specifications
- **Service Level Defaults**: Standard service levels and options
- **Billing Preferences**: Payment methods and billing cycle preferences

### 11.2 Notification Management

**Notification Categories**:
- **Shipment Updates**: Pickup, delivery, delay notifications
- **Warehouse Activities**: Receiving, releasing, inventory alerts
- **Billing Notifications**: Invoice generation, payment reminders
- **System Notifications**: Maintenance, updates, service announcements
- **Exception Alerts**: Delays, damages, service issues

**Notification Channels**:
- Email notifications with customizable frequency
- SMS alerts for critical updates
- In-app notifications and alerts
- Push notifications for mobile access
- Webhook integrations for system-to-system communication

### 11.3 Integration Settings

**API Configuration**:
- **API Key Management**: Generate and manage API keys for system integration
- **Webhook Setup**: Configure webhooks for real-time data synchronization
- **EDI Integration**: Electronic Data Interchange setup for automated transactions
- **Third-Party Connections**: Integration with customer ERP, WMS, or TMS systems

**Data Export Settings**:
- **Automated Exports**: Schedule regular data exports to customer systems
- **Export Formats**: CSV, XML, JSON, EDI format options
- **Data Mapping**: Configure field mapping for system integration
- **Security Settings**: Encryption and secure data transmission options

## Chapter 12: Mobile Responsiveness and Accessibility

### 12.1 Mobile Optimization

**Purpose**: Ensure full functionality across all device types[21].

**Mobile Features**:
- **Responsive Design**: Adaptive layouts for phones, tablets, and desktops
- **Touch-Friendly Interface**: Large buttons, easy navigation, gesture support
- **Offline Capability**: Cache critical information for offline access
- **Location Services**: GPS integration for mobile tracking and location services
- **Camera Integration**: Photo capture for documentation and proof of delivery

**Mobile-Specific Functions**:
- **Quick Actions**: Streamlined mobile interface for common tasks
- **Push Notifications**: Mobile app notifications for critical updates
- **Mobile Tracking**: Optimized tracking interface for mobile devices
- **Voice Commands**: Voice input for hands-free operation
- **Barcode Scanning**: Integration with mobile camera for barcode reading

### 12.2 Accessibility Features

**Accessibility Compliance**:
- **WCAG 2.1 AA Compliance**: Web Content Accessibility Guidelines compliance
- **Screen Reader Support**: Compatible with screen reading software
- **Keyboard Navigation**: Full keyboard navigation support
- **High Contrast Mode**: High contrast color schemes for visual impairments
- **Font Size Controls**: User-adjustable font sizes and styles

## Chapter 13: Security and Privacy

### 13.1 Data Security

**Security Measures**:
- **SSL/TLS Encryption**: All data transmission encrypted
- **Data Encryption**: Sensitive data encrypted at rest
- **Access Logging**: Comprehensive audit trails for all user actions
- **Regular Security Updates**: Continuous security monitoring and updates
- **Penetration Testing**: Regular security assessments and vulnerability testing

**Privacy Protection**:
- **Data Minimization**: Collect only necessary information
- **Consent Management**: Clear consent mechanisms for data processing
- **Right to Deletion**: Data deletion capabilities for privacy compliance
- **Data Portability**: Export customer data in standard formats
- **Privacy Policy**: Clear privacy policy and terms of service

### 13.2 Compliance and Certifications

**Industry Compliance**:
- **SOC 2 Type II**: Security and availability certification
- **ISO 27001**: Information security management system
- **GDPR Compliance**: General Data Protection Regulation compliance
- **CCPA Compliance**: California Consumer Privacy Act compliance
- **Industry-Specific Compliance**: Transportation and logistics regulatory compliance

## Chapter 14: Performance and Scalability

### 14.1 System Performance

**Performance Optimization**:
- **Load Balancing**: Distribute traffic across multiple servers
- **Content Delivery Network**: Global CDN for fast content delivery
- **Database Optimization**: Efficient database queries and indexing
- **Caching Strategy**: Intelligent caching for frequently accessed data
- **Performance Monitoring**: Real-time performance monitoring and alerting

**User Experience Optimization**:
- **Page Load Speed**: Optimize for fast page loading times
- **Progressive Loading**: Load critical content first, then additional features
- **Efficient UI**: Streamlined interface design for quick navigation
- **Bulk Operations**: Efficient handling of large data sets and operations
- **Search Optimization**: Fast and accurate search functionality

### 14.2 Scalability Planning

**Growth Accommodation**:
- **Horizontal Scaling**: Add resources as customer base grows
- **Microservices Architecture**: Scalable service-oriented architecture
- **Database Scaling**: Distributed database architecture for large data volumes
- **API Rate Limiting**: Manage API usage and prevent system overload
- **Resource Monitoring**: Automatic scaling based on system usage

This comprehensive specification provides a detailed blueprint for developing a customer portal that serves the specific needs of a B2B transportation and warehousing company, with particular focus on FTL services. The portal balances functionality, usability, and security while providing the transparency and self-service capabilities that modern logistics customers expect[1][22].

[1] https://acropolium.com/blog/logistics-customer-portal-development-step-by-step-guide/
[2] https://www.logisticsiotsoftware.in/freight-customer-portal/
[3] https://docs.oracle.com/en/cloud/saas/transportation/24b/otmol/planning/order_manager/quote/quote_request.htm
[4] https://home.kuehne-nagel.com/en/-/knowledge/how-to-get-a-quote
[5] https://ifreightsystems.com/blogs/freight-quote-software-6-must-have-features-to-win-more-lanes/
[6] https://www.fedex.com/en-us/logistics/portal.html
[7] https://support.huawei.com/enterprise/en/doc/EDOC1100112357/609549d8/understanding-portal-authentication
[8] https://www.usedatabrain.com/blog/transport-management-dashboard
[9] https://www.quantizeanalytics.co.uk/shipping-dashboard-examples/
[10] https://apps.odoo.com/apps/modules/16.0/dev_website_freight
[11] https://portpro.io/features/drayage-carrier/customer-portal
[12] https://www.octalsoftware.com/blog/freight-management-software-development
[13] https://supplychainorchestrator.com/blog/warehouse-customer-portal-and-its-benefits/
[14] https://www.datexcorp.com/3pl-wms-web-portal/
[15] https://www.matson.com/logistics/customer-portal/index.html
[16] https://www.fedex.com/en-ca/billing/fedex-freight-billing-online.html
[17] https://www.fedex.com/en-us/billing-online/ltl-freight.html
[18] https://www.slideteam.net/blog/top-5-transportation-dashboard-templates-with-examples-and-samples
[19] https://datakulture.com/dashboard-library/logistics-dashboard-examples/
[20] https://learn.liferay.com/w/dxp/commerce/inventory-management/setting-up-warehouses
[21] https://fuselabcreative.com/transportation-app-ui-ux-design-best-practices/
[22] https://yalantis.com/blog/create-logistics-customer-portal/
[23] https://www.splunk.com/en_us/blog/tips-and-tricks/dashboard-design-visualization-choices-and-configurations-part-1.html
[24] https://houseofshipping.com/freight-management-software-features/
[25] https://www.pinterest.com/ideas/logistics-dashboard-template/931044434184/
[26] https://www.boltrics.com/en/solutions/wms-warehouse-management-software/customer-portal/
[27] https://learn.microsoft.com/en-us/dynamics365/supply-chain/sales-marketing/customer-portal-customize
[28] https://www.pinterest.com/pin/delivery-logistic-transportation-app-for-efficient-shipment--683210205998408729/
[29] https://docs.rws.com/en-US/sdl-multitrans-785465/the-customer-portal-787655
[30] https://www.ibm.com/docs/en/itcam-app-mgr/7.2.1?topic=s2iccwpa-configuring-warehouse-proxy-agent-windows-odbc-connection
[31] https://community.dynamics.com/forums/thread/details/?threadid=b8c1e0a7-7a56-4200-a1ac-0011901645ae
[32] https://www.youtube.com/watch?v=A_0-XwSXviQ
[33] https://in.pinterest.com/pin/tms-dashboard-ui-screen--521080619379630500/
[34] https://www.logistiqo.com/en/externalUsers.php
[35] https://www.slideteam.net/powerpoint/Logistics-Dashboard
[36] https://help.sap.com/docs/SAP_TRANSPORTATION_MANAGEMENT/14e2fd56dd2e43b1b9db5120dcd89bae/884d6072ba3c11de2b8d000f20fcb6a9.html?version=9.4.3
[37] https://elements.envato.com/shipping-cargo-tracking-app-ui-kit-EN9GZMH
[38] https://www.logisticallyinc.com/post/does-your-tms-have-a-customer-portal
[39] https://docs.oracle.com/en/cloud/saas/transportation/24b/otmol/business_intelligence/dashboard.htm
[40] https://help.sap.com/docs/business-network-freight-collaboration/administration-guide-for-logistics-providers/user-administration-authentication-and-authorizations?version=0.Test
```
