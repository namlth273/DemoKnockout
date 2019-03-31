import { IBaseViewModel, IBaseParam } from "../../../models/models";
import { EnumFormId } from "../../../utils";

class TopSectionViewModel implements IBaseViewModel {
    formIndex: number = 0;
    formId: EnumFormId = EnumFormId.Step1;
    params: KnockoutObservable<IBaseParam> = ko.observable({} as IBaseParam);
    isComponentVisible: KnockoutComputed<boolean> = ko.computed(() => { return false; });
    isFormReadOnly: KnockoutComputed<boolean> = ko.computed(() => { return false; });
    name: KnockoutObservable<string> = ko.observable("");
    firstName: KnockoutObservable<string> = ko.observable("");

    constructor(params?: ITopSectionParam) {
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
                return !this.params().isMobile() || (this.params().isMobile() && (this.params().formIndex() == this.formIndex || !this.isFormReadOnly()));
            });
        }
    }

    mapParam() {
        this.name(this.params().requestModel().name());
        this.firstName(this.params().requestModel().firstName());
    }

    edit() {
        this.params().activeFormId(this.formId);
    }

    next() {
        this.params().requestModel().name(this.name());
        this.params().requestModel().firstName(this.firstName());
        this.params().activeFormId(EnumFormId.Step2);
        if (this.params().formIndex() == this.formIndex)
            this.params().formIndex(this.params().formIndex() + 1);
    }
}

export class TopSectionComponent {
    constructor() {
        return {
            viewModel: TopSectionViewModel,
            template: require("html-loader!./TopSection.html")
        };
    }
}

interface ITopSectionParam {
    params: KnockoutObservable<IBaseParam>;
}
