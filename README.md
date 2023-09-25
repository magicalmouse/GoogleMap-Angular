# Web Booker

## Description

This Angular client provides the frontend for the Web Booker site. The client is hosted in the S3 bucket **web.nts.taxi**. The client uses the Rideyellow_prod AppSync GraphQL API.

[AWS Ampify](https://docs.amplify.aws/) is used to interact with the AppSync API.

## Progress Tracker

The [Progress Tracker Excel Sheet](https://docs.google.com/spreadsheets/d/1u-5yai9lmPRgbUuDcSjkBgMg_n9TgdxrKr40narhadI/edit#gid=428572095) provides a list of features that have been developed, need to developed, or are in development.

## Installation

```bash
npm install
```

To run on local machine:

```bash
ng serve --open
```

**If you would like to test the Angular web client on mobile devices through localhost, follow the instructions in the [article](https://www.coditty.com/code/how-to-run-angular-over-https-on-localhost). XCode and Android Studio have emulators that can be used to test the web client on different devices.**

An **aws-exports.js** file will also need to be created in the **src/** folder for the AppSync API.

## Releasing New Version

**Note: The public facing url (https://web.nts.taxi) is routed through AWS CloudFront. This means that changes in the new version will not be reflected until the cache has been invalidated for the CloudFront distribution.**

**Note: Make sure that any urls being used within the application are set to the production stage before releasing a new version.**

1. To release a new version of the FMP client, the Angular code must first be compiled:
    ```bash
    ng build --prod
    ```
    This will create the **dist/** folder that contains the files to be uploaded.
2. Navigate to the **web.nts.taxi** S3 bucket.
3. To avoid duplicates, delete all files in the S3 bucket **except for the assets/ folder**.
4. Upload the files contained in the **dist/** folder on your local machine. **Note: In order to allow the website to use the files, the ACL Permission for Read Objects must be granted to Everyone (public access). Set this permission when uploading the files. See image below.**  
   ![](./docs/ACLPermissions.png)
5. Verify that the website is working correctly by viewing the [website endpoint](http://web.nts.taxi.s3-website.us-east-2.amazonaws.com) for the S3 bucket.
6. If everything looks good, navigate to AWS CloudFront and select the distribution attached to **web.nts.taxi**.
7. Choose the **Invalidations** tab and click **Create Invalidation**. Set /\* as the object path and create the invalidation.
   **This invalidates the cache and allows CloudFront to serve the updated files in the S3 bucket.**
8. Navigate to [https://web.nts.taxi](https://web.nts.taxi) and verify that the update application is working. (A hard-refresh of the browser page may be required to view the update.)

## API URLs

AppSync

Testing: https://jkzxalmnxvftderonq43zxkl44.appsync-api.us-east-2.amazonaws.com/graphql
Production: https://44up6xqyazerfeeynqqwxrqm4y.appsync-api.us-east-2.amazonaws.com/graphql

## Known Bugs

-   If the address text fields are not cleared using the "clear icon", but instead deleted via backspacing, when the new address is selected from the list, it will not populate the address correctly.
-   The pickup/dropoff markers on the map are sometimes not cleared when the address is cleared or changed.
