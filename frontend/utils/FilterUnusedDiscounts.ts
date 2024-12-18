interface Discount {
    discountId: number;
    amount: number;
    from: string;
}

export default function filterUnusedDiscounts(buyerDiscounts: Discount[], usedDiscounts: { discountId: number }[]): Discount[] {
    const usedIds = new Set(usedDiscounts.map(discount => discount.discountId)); // Récupère les IDs utilisés
    return buyerDiscounts.filter(discount => !usedIds.has(discount.discountId)); // Filtre les non-utilisés
};