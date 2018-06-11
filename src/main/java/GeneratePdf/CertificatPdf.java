package GeneratePdf;

import java.util.*;

import javax.servlet.http.*;

import org.springframework.web.servlet.view.document.AbstractPdfView;

import sn.gestion.clinique.entites.Certificat;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;

public class CertificatPdf extends AbstractPdfView{

	@Override
	protected void buildPdfDocument(Map model, Document document,
			PdfWriter arg2, HttpServletRequest arg3, HttpServletResponse response)
			throws Exception {
			response.setHeader("Content-Disposition", "attachment: filename=\"certificatmedical.pdf\"");
			@SuppressWarnings("unchecked")
			Certificat cert= (Certificat) model.get("certificat");
			String text="\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tJe soussign� Dr. "+cert.getMedecin().getNom()+", certifie avoir examin� M "+cert.getPatient().getPrenom()+" "+cert.getPatient().getNom()+
				"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSon �tat de sant� n�c�ssite un arret de ses activit�s de "+cert.getNbjour()+
				" jours, � partir du "+cert.getDate()+
				"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tDestin� � l'int�r�ss� pour servir et valoir ce que de droit";
			Paragraph header=new Paragraph(new Chunk("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t Certificat M�dical",FontFactory.getFont(FontFactory.TIMES_ITALIC,22)));
			Paragraph date=new Paragraph(new Chunk("\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tNotre Clinique, le "+cert.getDate()+"\n\n",FontFactory.getFont(FontFactory.TIMES_ITALIC,12)));
			Paragraph content=new Paragraph(new Chunk("\n\n"+text,FontFactory.getFont(FontFactory.TIMES_ITALIC,13)));
			document.add(date);
			document.add(header);
			document.add(content);
	}
}