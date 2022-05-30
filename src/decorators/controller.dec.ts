/**
 * @Author: Jeff
 * @CreatedAt: Apr. 16, 2022 21:20:14
 * @ModifiedAt: Apr. 16, 2022 21:20:15
 * @ModifiedBy: Jeff
 */

export default (options?: any) => {
    console.log(111, options);
    return (target: any, key: string, prop: PropertyDescriptor) => {
        console.log(222, target, key, prop);
    };
};
