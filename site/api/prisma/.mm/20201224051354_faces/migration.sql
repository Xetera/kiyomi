-- CreateTable
CREATE TABLE "Face" (
"if" SERIAL,
    "imageId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "descriptor" DECIMAL(65,30)[],

    PRIMARY KEY ("if")
);

-- AddForeignKey
ALTER TABLE "Face" ADD FOREIGN KEY("imageId")REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
