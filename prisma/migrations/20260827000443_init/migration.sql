-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "PassengerTitle" AS ENUM ('MR', 'MRS', 'MS', 'MISS', 'DR');

-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('GOOGLE', 'GITHUB', 'MICROSOFT');

-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('AIRPORT', 'CITY');

-- CreateEnum
CREATE TYPE "CabinClass" AS ENUM ('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('SEAT', 'BAGGAGE', 'MEAL', 'LOUNGE', 'PRIORITY', 'WIFI', 'OTHER');

-- CreateEnum
CREATE TYPE "BaggageType" AS ENUM ('CABIN', 'CHECKED', 'OTHER');

-- CreateEnum
CREATE TYPE "BookingChangeStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "BookingChangeItemType" AS ENUM ('ADD_SLICE', 'REMOVE_SLICE', 'REPLACE_SLICE');

-- CreateEnum
CREATE TYPE "CancellationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CancellationRefundDestination" AS ENUM ('ORIGINAL_PAYMENT_METHOD', 'BALANCE', 'VOUCHER', 'AIRLINE_CREDIT', 'AWAITING_PAYMENT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'REQUIRES_ACTION', 'SUCCEEDED', 'PARTIALLY_REFUNDED', 'REFUNDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentAttemptStatus" AS ENUM ('PENDING', 'PROCESSING', 'REQUIRES_ACTION', 'SUCCEEDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('DUFFEL', 'STRIPE', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'MOBILE_MONEY', 'BANK_TRANSFER', 'BALANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED');

-- CreateEnum
CREATE TYPE "RefundReason" AS ENUM ('CANCELLATION', 'CHANGE', 'SERVICE', 'MANUAL', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordCredential" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "OAuthProvider" NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassengerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "title" "PassengerTitle",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PassengerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "originCode" TEXT NOT NULL,
    "destinationCode" TEXT NOT NULL,
    "originType" "PlaceType" NOT NULL,
    "destinationType" "PlaceType" NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "cabinClass" "CabinClass" NOT NULL DEFAULT 'ECONOMY',
    "maxConnections" INTEGER,
    "duffelOfferRequestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlightSearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightOffer" (
    "id" TEXT NOT NULL,
    "searchId" TEXT NOT NULL,
    "duffelOfferId" TEXT NOT NULL,
    "baseAmount" DECIMAL(65,30) NOT NULL,
    "taxAmount" DECIMAL(65,30) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlightOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightSlice" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "originCode" TEXT NOT NULL,
    "destinationCode" TEXT NOT NULL,
    "departureAt" TIMESTAMP(3) NOT NULL,
    "arrivalAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,

    CONSTRAINT "FlightSlice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightSegment" (
    "id" TEXT NOT NULL,
    "sliceId" TEXT NOT NULL,
    "originCode" TEXT NOT NULL,
    "destinationCode" TEXT NOT NULL,
    "departureAt" TIMESTAMP(3) NOT NULL,
    "arrivalAt" TIMESTAMP(3) NOT NULL,
    "marketingCarrierCode" TEXT NOT NULL,
    "operatingCarrierCode" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "aircraftCode" TEXT,
    "durationMinutes" INTEGER NOT NULL,

    CONSTRAINT "FlightSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "offerId" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "bookingReference" TEXT,
    "duffelOrderId" TEXT,
    "duffelOrderReference" TEXT,
    "supplierBaseAmount" DECIMAL(65,30) NOT NULL,
    "supplierTaxAmount" DECIMAL(65,30) NOT NULL,
    "supplierServiceAmount" DECIMAL(65,30) NOT NULL,
    "supplierTotalAmount" DECIMAL(65,30) NOT NULL,
    "platformFeeAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "customerTotalAmount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingPassenger" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "passengerProfileId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "title" "PassengerTitle",
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingPassenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSlice" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "originCode" TEXT NOT NULL,
    "originName" TEXT NOT NULL,
    "destinationCode" TEXT NOT NULL,
    "destinationName" TEXT NOT NULL,
    "departureAt" TIMESTAMP(3) NOT NULL,
    "arrivalAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,

    CONSTRAINT "BookingSlice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSegment" (
    "id" TEXT NOT NULL,
    "sliceId" TEXT NOT NULL,
    "originCode" TEXT NOT NULL,
    "originName" TEXT NOT NULL,
    "destinationCode" TEXT NOT NULL,
    "destinationName" TEXT NOT NULL,
    "departureAt" TIMESTAMP(3) NOT NULL,
    "arrivalAt" TIMESTAMP(3) NOT NULL,
    "marketingCarrierCode" TEXT NOT NULL,
    "marketingCarrierName" TEXT,
    "operatingCarrierCode" TEXT NOT NULL,
    "operatingCarrierName" TEXT,
    "flightNumber" TEXT NOT NULL,
    "aircraftCode" TEXT,
    "durationMinutes" INTEGER NOT NULL,
    "cabinClass" "CabinClass",

    CONSTRAINT "BookingSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingService" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "passengerId" TEXT,
    "segmentId" TEXT,
    "type" "ServiceType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT,
    "code" TEXT,
    "unitAmount" DECIMAL(65,30) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "duffelServiceId" TEXT,
    "seatDesignator" TEXT,
    "baggageType" "BaggageType",
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "amountPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "amountRefunded" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentAttempt" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "status" "PaymentAttemptStatus" NOT NULL DEFAULT 'PENDING',
    "provider" "PaymentProvider" NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "providerTransactionId" TEXT,
    "providerPaymentId" TEXT,
    "failureCode" TEXT,
    "failureMessage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "PaymentAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "RefundStatus" NOT NULL DEFAULT 'PENDING',
    "reason" "RefundReason",
    "providerRefundId" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "failureCode" TEXT,
    "failureMessage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentEvent" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "attemptId" TEXT,
    "type" TEXT NOT NULL,
    "providerEventId" TEXT,
    "payload" JSONB NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingChange" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "BookingChangeStatus" NOT NULL DEFAULT 'PENDING',
    "duffelOrderChangeRequestId" TEXT,
    "duffelOrderChangeOfferId" TEXT,
    "duffelOrderChangeId" TEXT,
    "previousTotalAmount" DECIMAL(65,30) NOT NULL,
    "newTotalAmount" DECIMAL(65,30) NOT NULL,
    "penaltyAmount" DECIMAL(65,30) NOT NULL,
    "adjustmentAmount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "BookingChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingChangeItem" (
    "id" TEXT NOT NULL,
    "changeId" TEXT NOT NULL,
    "type" "BookingChangeItemType" NOT NULL,
    "oldSliceId" TEXT,
    "newSliceId" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingChangeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingCancellation" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "CancellationStatus" NOT NULL DEFAULT 'PENDING',
    "duffelCancellationId" TEXT,
    "refundAmount" DECIMAL(65,30),
    "refundCurrency" TEXT,
    "refundTo" "CancellationRefundDestination",
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "BookingCancellation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordCredential_userId_key" ON "PasswordCredential"("userId");

-- CreateIndex
CREATE INDEX "OAuthAccount_userId_idx" ON "OAuthAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_provider_providerId_key" ON "OAuthAccount"("provider", "providerId");

-- CreateIndex
CREATE INDEX "PassengerProfile_userId_idx" ON "PassengerProfile"("userId");

-- CreateIndex
CREATE INDEX "FlightSearch_userId_idx" ON "FlightSearch"("userId");

-- CreateIndex
CREATE INDEX "FlightSearch_originCode_destinationCode_idx" ON "FlightSearch"("originCode", "destinationCode");

-- CreateIndex
CREATE INDEX "FlightSearch_createdAt_idx" ON "FlightSearch"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FlightOffer_duffelOfferId_key" ON "FlightOffer"("duffelOfferId");

-- CreateIndex
CREATE INDEX "FlightOffer_searchId_idx" ON "FlightOffer"("searchId");

-- CreateIndex
CREATE INDEX "FlightOffer_expiresAt_idx" ON "FlightOffer"("expiresAt");

-- CreateIndex
CREATE INDEX "FlightSlice_offerId_idx" ON "FlightSlice"("offerId");

-- CreateIndex
CREATE INDEX "FlightSegment_sliceId_idx" ON "FlightSegment"("sliceId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_duffelOrderId_idx" ON "Booking"("duffelOrderId");

-- CreateIndex
CREATE INDEX "Booking_bookingReference_idx" ON "Booking"("bookingReference");

-- CreateIndex
CREATE INDEX "BookingPassenger_bookingId_idx" ON "BookingPassenger"("bookingId");

-- CreateIndex
CREATE INDEX "BookingPassenger_passengerProfileId_idx" ON "BookingPassenger"("passengerProfileId");

-- CreateIndex
CREATE INDEX "BookingSlice_bookingId_idx" ON "BookingSlice"("bookingId");

-- CreateIndex
CREATE INDEX "BookingSegment_sliceId_idx" ON "BookingSegment"("sliceId");

-- CreateIndex
CREATE INDEX "BookingService_bookingId_idx" ON "BookingService"("bookingId");

-- CreateIndex
CREATE INDEX "BookingService_passengerId_idx" ON "BookingService"("passengerId");

-- CreateIndex
CREATE INDEX "BookingService_segmentId_idx" ON "BookingService"("segmentId");

-- CreateIndex
CREATE INDEX "Payment_bookingId_idx" ON "Payment"("bookingId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAttempt_idempotencyKey_key" ON "PaymentAttempt"("idempotencyKey");

-- CreateIndex
CREATE INDEX "PaymentAttempt_paymentId_idx" ON "PaymentAttempt"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentAttempt_status_idx" ON "PaymentAttempt"("status");

-- CreateIndex
CREATE INDEX "PaymentAttempt_providerTransactionId_idx" ON "PaymentAttempt"("providerTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_idempotencyKey_key" ON "Refund"("idempotencyKey");

-- CreateIndex
CREATE INDEX "Refund_paymentId_idx" ON "Refund"("paymentId");

-- CreateIndex
CREATE INDEX "Refund_status_idx" ON "Refund"("status");

-- CreateIndex
CREATE INDEX "Refund_providerRefundId_idx" ON "Refund"("providerRefundId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentEvent_providerEventId_key" ON "PaymentEvent"("providerEventId");

-- CreateIndex
CREATE INDEX "PaymentEvent_paymentId_idx" ON "PaymentEvent"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentEvent_attemptId_idx" ON "PaymentEvent"("attemptId");

-- CreateIndex
CREATE INDEX "BookingChange_bookingId_idx" ON "BookingChange"("bookingId");

-- CreateIndex
CREATE INDEX "BookingChange_status_idx" ON "BookingChange"("status");

-- CreateIndex
CREATE INDEX "BookingChangeItem_changeId_idx" ON "BookingChangeItem"("changeId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingCancellation_bookingId_key" ON "BookingCancellation"("bookingId");

-- AddForeignKey
ALTER TABLE "PasswordCredential" ADD CONSTRAINT "PasswordCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassengerProfile" ADD CONSTRAINT "PassengerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightSearch" ADD CONSTRAINT "FlightSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightOffer" ADD CONSTRAINT "FlightOffer_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "FlightSearch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightSlice" ADD CONSTRAINT "FlightSlice_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "FlightOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightSegment" ADD CONSTRAINT "FlightSegment_sliceId_fkey" FOREIGN KEY ("sliceId") REFERENCES "FlightSlice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "FlightOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingPassenger" ADD CONSTRAINT "BookingPassenger_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingPassenger" ADD CONSTRAINT "BookingPassenger_passengerProfileId_fkey" FOREIGN KEY ("passengerProfileId") REFERENCES "PassengerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSlice" ADD CONSTRAINT "BookingSlice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSegment" ADD CONSTRAINT "BookingSegment_sliceId_fkey" FOREIGN KEY ("sliceId") REFERENCES "BookingSlice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD CONSTRAINT "BookingService_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD CONSTRAINT "BookingService_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "BookingPassenger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD CONSTRAINT "BookingService_segmentId_fkey" FOREIGN KEY ("segmentId") REFERENCES "BookingSegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentAttempt" ADD CONSTRAINT "PaymentAttempt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentEvent" ADD CONSTRAINT "PaymentEvent_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentEvent" ADD CONSTRAINT "PaymentEvent_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "PaymentAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingChange" ADD CONSTRAINT "BookingChange_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingChangeItem" ADD CONSTRAINT "BookingChangeItem_changeId_fkey" FOREIGN KEY ("changeId") REFERENCES "BookingChange"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingCancellation" ADD CONSTRAINT "BookingCancellation_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
