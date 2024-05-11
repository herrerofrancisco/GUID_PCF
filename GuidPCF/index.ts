import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as copy from 'copy-to-clipboard';

export class GuidPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _container_alert: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _labelElement: HTMLLabelElement;
    private _labelElement_alert: HTMLLabelElement;
    private _buttonElement:HTMLButtonElement;
    
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._context = context;
        this._container = document.createElement("div");
        this._container.style.display = "flex";
        this._container.style.alignItems = "center";
        this._notifyOutputChanged = notifyOutputChanged;
    
        // Crear un elemento para mostrar el GUID
        this._labelElement = document.createElement("label");
        this._labelElement.setAttribute("class", "guidlabel");
        this._labelElement.setAttribute("id", "guidlabelid");
    
        //Crear imagen
        this._buttonElement = document.createElement("button");
        this._buttonElement.innerText = "Copy";

		


        //Crear alerta
        this._container_alert = document.createElement("div");
        this._labelElement_alert = document.createElement("label");
        this._labelElement_alert.innerHTML = "Guid copied!";
        this._labelElement_alert.style.visibility="hidden";
        this._labelElement_alert.style.textAlign = "left";
        this._container_alert.appendChild(this._labelElement_alert);

        // Obtener el GUID del registro actual del contexto
        const entityId = (context.mode as any).contextInfo.entityId;
    
        // Asignar el GUID al elemento label
        if (entityId != null) {
            this._labelElement.innerHTML = entityId;


            //this._imgElement.src = "img/copy.png"; 
            this._buttonElement.style.marginLeft = "15px";
            this._buttonElement.addEventListener("click", this.onImageClick.bind(this));

        } else {
            this._labelElement.innerHTML = "N/A";
        }
    
        // Agregar el elemento label al contenedor
        this._container.appendChild(this._labelElement);
        this._container.appendChild(this._buttonElement);
        container.appendChild(this._container);
        container.appendChild(this._container_alert);

    }
    
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {

    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }

    private onImageClick(): void
    {
        copy(this._labelElement.innerHTML.toString());
        this._labelElement_alert.style.visibility="visible";

        setTimeout(() => {
            this._labelElement_alert.style.visibility = "hidden";
        }, 5000); // 5000 milisegundos = 5 segundos

    }


}
