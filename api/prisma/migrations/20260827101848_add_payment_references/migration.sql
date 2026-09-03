/*
  Warnings:

  - A unique constraint covering the columns `[paymentReference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attemptReference]` on the table `PaymentAttempt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refundReference]` on the table `Refund` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentReference` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attemptReference` to the `PaymentAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refundReference` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentReference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentAttempt" ADD COLUMN     "attemptReference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "refundReference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentReference_key" ON "Payment"("paymentReference");

-- CreateIndex
CREATE INDEX "Payment_paymentReference_idx" ON "Payment"("paymentReference");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAttempt_attemptReference_key" ON "PaymentAttempt"("attemptReference");

-- CreateIndex
CREATE INDEX "PaymentAttempt_attemptReference_idx" ON "PaymentAttempt"("attemptReference");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_refundReference_key" ON "Refund"("refundReference");

-- CreateIndex
CREATE INDEX "Refund_refundReference_idx" ON "Refund"("refundReference");
