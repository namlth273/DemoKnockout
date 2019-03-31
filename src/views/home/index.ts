import { TopSectionComponent } from "./_/TopSection";
import { SecondSectionComponent } from "./_/SecondSection";
import { IRequestModel, IBaseParam } from "../../models/models";
import { EnumFormId } from "../../utils";

class HomeViewModel {
    name: KnockoutObservable<string> = ko.observable(new Date().toTimeString());
    params: KnockoutObservable<IBaseParam> = ko.observable(
        {
            requestModel: ko.observable({
                name: ko.observable(""),
                firstName: ko.observable(""),
                lastName: ko.observable("")
            } as IRequestModel),
            isInEditMode: ko.observable(false),
            formIndex: ko.observable(0),
            activeFormId: ko.observable(EnumFormId.Step1),
            isMobile: ko.computed(() => {
                return false;
            })
        } as IBaseParam);
    isFormClearing: KnockoutObservable<boolean> = ko.observable(false);
    windowWidth: KnockoutObservable<number> = ko.observable(window.innerWidth);

    constructor(params: IHomeParam) {
        if (params) {
            this.windowWidth = params.windowWidth;

            this.params().isMobile = ko.computed(() => {
                return this.windowWidth() < 992;
            });
        }
    }

    update() {
        this.name(new Date().toTimeString());
    }

    clearForm() {
        this.isFormClearing(true);

        setTimeout(() => {
            console.log("Form Cleared");
            this.params().requestModel({
                name: ko.observable(""),
                firstName: ko.observable(""),
                lastName: ko.observable("")
            } as IRequestModel);
            this.params().formIndex(0);
            this.params().isInEditMode(false);
            this.isFormClearing(false);
        }, 2000);
    }

    setDefault() {
        this.params().requestModel({
            name: ko.observable("Nam Le"),
            firstName: ko.observable("Nam"),
            lastName: ko.observable("Le")
        } as IRequestModel);

        this.params().isInEditMode(true);
    }

    next() {
        this.params().formIndex(this.params().formIndex() + 1);
    }

    editMode() {
        this.params().isInEditMode(!this.params().isInEditMode());
    }
}

interface IHomeParam {
    windowWidth: KnockoutObservable<number>;
}

export class HomeComponent {
    constructor() {
        return {
            viewModel: HomeViewModel,
            template: require("html-loader!./index.html")
        };
    }
}

ko.components.register("top-section", new TopSectionComponent());
ko.components.register("second-section", new SecondSectionComponent());