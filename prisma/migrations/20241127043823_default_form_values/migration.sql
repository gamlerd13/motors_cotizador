-- CreateTable
CREATE TABLE "DefaulFormValues" (
    "id" SERIAL NOT NULL,
    "companyPhone" TEXT NOT NULL DEFAULT '',
    "companyEmail" TEXT NOT NULL DEFAULT '',
    "bankAccountNumber" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DefaulFormValues_pkey" PRIMARY KEY ("id")
);
