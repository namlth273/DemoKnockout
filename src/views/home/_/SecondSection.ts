import { IBaseViewModel, IBaseParam } from "@/models/models";
import { EnumFormId } from "@/utils";

class SecondSectionViewModel implements IBaseViewModel {
    formIndex: number = 2;
    formId: EnumFormId = EnumFormId.Step2;
    params: KnockoutObservable<IBaseParam> = ko.observable({} as IBaseParam);
    isComponentVisible: KnockoutComputed<boolean> = ko.computed(() => { return false; });
    isFormReadOnly: KnockoutComputed<boolean> = ko.computed(() => { return false; });
    lastName: KnockoutObservable<string> = ko.observable("");

    constructor(params?: ISecondSectionParam) {
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
        this.lastName(this.params().requestModel().lastName());
    }

    edit() {
        this.params().activeFormId(this.formId);
    }

    next() {
        this.params().requestModel().lastName(this.lastName());
        this.params().activeFormId(EnumFormId.Step3);
        if (this.params().formIndex() == this.formIndex)
            this.params().formIndex(this.params().formIndex() + 1);
    }
}

export class SecondSectionComponent {
    constructor() {
        return {
            viewModel: SecondSectionViewModel,
            template: require("html-loader!./SecondSection.html")
        };
    }
}

interface ISecondSectionParam {
    params: KnockoutObservable<IBaseParam>;
}
