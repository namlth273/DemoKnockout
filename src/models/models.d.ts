import { EnumFormId } from "@/utils";

export interface IBaseViewModel {

}

export interface IBaseParam {
    requestModel: KnockoutObservable<IRequestModel>;
    isInEditMode: KnockoutObservable<boolean>;
    formIndex: KnockoutObservable<number>;
    activeFormId: KnockoutObservable<EnumFormId>;
    isMobile: KnockoutComputed<boolean>;
}

export interface IComponent {
    viewModel: IBaseViewModel;
    template: string;
}

export interface IRequestModel {
    name: KnockoutObservable<string>;
    firstName: KnockoutObservable<string>;
    lastName: KnockoutObservable<string>;
    totalAmount: KnockoutObservable<number | null>;
}

export interface IScopeOfWork {
    index: number,
    isActive: KnockoutObservable<boolean>,
    isFirstOfType: KnockoutObservable<boolean>,
    isLastOfType: KnockoutObservable<boolean>,
    isFirstActive: KnockoutObservable<boolean>,
    isLastActive: KnockoutObservable<boolean>,
    isOnly: KnockoutObservable<boolean>
}
