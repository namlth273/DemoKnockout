import { IBaseViewModel, IBaseParam } from "../../../models/models";
import { EnumFormId } from "../../../utils";

class ThirdSectionViewModel implements IBaseViewModel {
    formIndex: number = 3;
    formId: EnumFormId = EnumFormId.Step3;
    params: KnockoutObservable<IBaseParam> = ko.observable({} as IBaseParam);
    isComponentVisible: KnockoutComputed<boolean> = ko.computed(() => { return false; });
    isFormReadOnly: KnockoutComputed<boolean> = ko.computed(() => { return false; });
    totalAmount: KnockoutObservable<number | null> = ko.observable(null);

    constructor(params?: IThirdSectionParam) {
        if (params && params.params()) {
            this.params = params.params;

            this.mapParam();

            this.params().isInEditMode.subscribe(newValue => {
                if (!newValue) return;
                this.mapParam();
            });

            this.params().activeFormId(this.formId);

            this.isFormReadOnly = ko.computed(() => {
                return this.params().formIndex() >= this.formIndex && this.params().activeFormId() != this.formId;
            });

            this.isComponentVisible = ko.computed(() => {
                return !this.params().isMobile() || (this.params().isMobile() && (this.params().activeFormId() == this.formId));
            });
        }
    }

    mapParam() {
        this.totalAmount(this.params().requestModel().totalAmount());
    }

    edit() {
        this.params().activeFormId(this.formId);
    }

    next() {
        this.params().requestModel().totalAmount(this.totalAmount());
        this.params().activeFormId(EnumFormId.None);
        if (this.params().formIndex() == this.formIndex)
            this.params().formIndex(this.params().formIndex() + 1);
    }
}

export class ThirdSectionComponent {
    constructor() {
        return {
            viewModel: ThirdSectionViewModel,
            template: require("html-loader!./ThirdSection.html")
        };
    }
}

interface IThirdSectionParam {
    params: KnockoutObservable<IBaseParam>;
}
