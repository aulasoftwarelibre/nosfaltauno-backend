import { SubscriptionId } from './subscription-id';


describe('Subscription Id', () => {
    it('creates a Subscription Id VO', () =>{
        const id = 'd1803f23-c57c-45d9-bd67-0c81c03e41c5';
        const subscriptionId = SubscriptionId.fromString(id);
        expect(subscriptionId.value).toBe(id);
    });
})
